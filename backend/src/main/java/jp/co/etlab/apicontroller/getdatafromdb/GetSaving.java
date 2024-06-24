package jp.co.etlab.apicontroller.getdatafromdb;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import jp.co.etlab.apicontroller.classcontroller.KakeboClass;
import jp.co.etlab.apicontroller.dbconection.ConnectionDB;

public class GetSaving implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        
       try {
            Connection con = ConnectionDB.getConnection();
            if (con != null) {
                System.out.println("connected");
                String response = "";
                String query = "Select * from  Savings ";
                PreparedStatement pstmt = con.prepareStatement(query);
                ResultSet rs = pstmt.executeQuery();
                KakeboClass saving = null ;
                List<KakeboClass> savings = new ArrayList<>();
                while (rs.next()) {
                    String description =rs.getString("description");
                    double amount = rs.getDouble("amount");
                    String saving_date = rs.getString("saving_date");
                    saving = new KakeboClass();
                    saving.SetDescription(description);
                    saving.Setamount(amount);
                    saving.SetSavingDate(saving_date);
                    savings.add(saving);
                }
                pstmt.close();
                con.close();
                Gson gson = new Gson();
                response =gson.toJson(savings);
                exchange.getResponseHeaders().add("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
   
}
