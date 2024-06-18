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
import jp.co.etlab.apicontroller.dbconection.ConnectionDB;

public class GetallBudget implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        
       try {
            Connection con = ConnectionDB.getConnection();
            if (con != null) {
                System.out.println("connected");
                String response = "";
                String query = "select * from Budget";
                PreparedStatement pstmt = con.prepareStatement(query);
                ResultSet rs = pstmt.executeQuery();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                BudgetClass budget = null ;
                List<BudgetClass> allbudget = new ArrayList<>();
                while (rs.next()) {
                    int id = rs.getInt("id");
                    String period =rs.getString("period");
                    double total_amount = rs.getDouble("total_amount");
                    Date created_date = rs.getDate("created_at");
                    Date End_date = rs.getDate("End_date");
                    Boolean valid = rs.getBoolean("current_month");

                    String createdDateString = dateFormat.format(created_date);
                    String endDateString = dateFormat.format(End_date);
                    budget = new BudgetClass(id, period, total_amount, createdDateString, endDateString , valid);
                    allbudget.add(budget);
                }
                pstmt.close();
                con.close();
                Gson gson = new Gson();
                response =gson.toJson(allbudget);
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
