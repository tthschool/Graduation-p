package jp.co.etlab.apicontroller.getdatafromdb;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import jp.co.etlab.apicontroller.classcontroller.KakeboClass;
import jp.co.etlab.apicontroller.dbconection.ConnectionDB;

public class GetallBudget implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        
       try {
            Connection con = ConnectionDB.getConnection();
            if (con != null) {
                String response = "";
                String query = "select * from Budget";
                PreparedStatement pstmt = con.prepareStatement(query);
                ResultSet rs = pstmt.executeQuery();
                KakeboClass budget = null ;
            
                List<KakeboClass> allbudget = new ArrayList<>();
                while (rs.next()) {
                    String period =rs.getString("period");
                    double total_amount = rs.getDouble("amount");
                    Boolean current_month = rs.getBoolean("current_month");
                    budget = new KakeboClass();
                    budget.SetPeriod(period);
                    budget.Setamount(total_amount);
                    budget.SetCurrentMonth(current_month);
                    allbudget.add(budget);
                }
                pstmt.close();
                con.close();
                Gson gson = new Gson();
                response =gson.toJson(allbudget);
                System.out.println(response);
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
