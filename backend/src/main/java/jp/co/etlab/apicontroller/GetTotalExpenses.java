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
import jp.co.etlab.apicontroller.classcontroller.Expenses;
import jp.co.etlab.apicontroller.classcontroller.SavingPeriod;
import jp.co.etlab.apicontroller.classcontroller.TotalSpend;
import jp.co.etlab.apicontroller.dbconection.ConnectionDB;

public class GetTotalExpenses implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        
       try {
            Connection con = ConnectionDB.getConnection();
            if (con != null) {
                System.out.println("connected");
                String response = "";
                String query = "select * from Expenses ";
                PreparedStatement pstmt = con.prepareStatement(query);
                ResultSet rs = pstmt.executeQuery();
                List<Expenses> totalExpenses = new ArrayList<>();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Expenses totalSpend  = null ;
                while (rs.next()) {
                    Date spent_date = rs.getDate("date");
                    double total_amount = rs.getDouble("amount");
                    String description = rs.getString("description");
                    String endDateString = dateFormat.format(spent_date);
                    totalSpend = new Expenses(description, total_amount  , endDateString);
                    totalExpenses.add(totalSpend);
                }
                pstmt.close();
                con.close();
                Gson gson = new Gson();
                response =gson.toJson(totalExpenses);
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
