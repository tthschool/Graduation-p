package jp.co.etlab.apicontroller.getdatafromdb;

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
import jp.co.etlab.apicontroller.dbconection.ConnectionDB;

public class GetBudGet implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        
       try {
            Connection con = ConnectionDB.getConnection();
            if (con != null) {
                System.out.println("connected");
                String response = "";
                String query = "select * from Budget where current_month = 1";
                PreparedStatement pstmt = con.prepareStatement(query);
                ResultSet rs = pstmt.executeQuery();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                BudgetClass budget = null ;
                while (rs.next()) {
                    int id = rs.getInt("id");
                    String period =rs.getString("period");
                    double total_amount = rs.getDouble("total_amount");
                    Date created_date = rs.getDate("created_at");
                    Boolean valid = rs.getBoolean("current_month");
                    
                    String createdDateString = dateFormat.format(created_date);
                    budget = new BudgetClass(id, period, total_amount, createdDateString ,valid);
                }
                pstmt.close();
                con.close();
                Gson gson = new Gson();
                response =gson.toJson(budget);
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
