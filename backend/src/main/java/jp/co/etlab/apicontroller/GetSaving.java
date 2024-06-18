package jp.co.etlab.apicontroller;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import jp.co.etlab.apicontroller.classcontroller.BudgetClass;
import jp.co.etlab.apicontroller.classcontroller.SavingPeriod;
import jp.co.etlab.apicontroller.dbconection.ConnectionDB;

public class GetSaving implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        
       try {
            Connection con = ConnectionDB.getConnection();
            if (con != null) {
                System.out.println("connected");
                String response = "";
                String query = "Select b.period ,  s.amount   from Budget as b INNER JOIN Savings as s  ON b.id = s.budget_id ;";
                PreparedStatement pstmt = con.prepareStatement(query);
                ResultSet rs = pstmt.executeQuery();
                SavingPeriod saving = null ;
                List<SavingPeriod> savings = new ArrayList<>();

                while (rs.next()) {
                    String period =rs.getString("period");
                    double total_amount = rs.getDouble("amount");
                    saving = new SavingPeriod(period, total_amount);
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
