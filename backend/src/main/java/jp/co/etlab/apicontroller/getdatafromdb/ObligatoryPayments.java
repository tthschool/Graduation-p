

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

import jp.co.etlab.apicontroller.classcontroller.TotalSpend;
import jp.co.etlab.apicontroller.dbconection.ConnectionDB;

public class ObligatoryPayments implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        
       try {
            Connection con = ConnectionDB.getConnection();
            if (con != null) {
                System.out.println("connected");
                String response = "";
                String query = "select description , amount , payment_date from ObligatoryPayments ";
                PreparedStatement pstmt = con.prepareStatement(query);
                ResultSet rs = pstmt.executeQuery();
                List<TotalSpend> totalSpends = new ArrayList<>();
                TotalSpend totalSpend  = null ;
                while (rs.next()) {
                    String period =rs.getString("period");
                    double total_amount = rs.getDouble("amount");
                    String description = rs.getString("description");
                    totalSpend = new TotalSpend(period, description  , total_amount);
                    totalSpends.add(totalSpend);
                }
                pstmt.close();
                con.close();
                Gson gson = new Gson();
                response =gson.toJson(totalSpends);
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

