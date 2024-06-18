package jp.co.etlab.apicontroller;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class GetAllItems implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        
       try {
            Connection con = getConnection();
            if (con != null) {
                String response = "";
                String query = "select * from items";
                PreparedStatement pstmt = con.prepareStatement(query);
                ResultSet rs = pstmt.executeQuery();
                List<Item> items =  new ArrayList<>() ;
                while (rs.next()) {
                    Item item = new Item(
                        rs.getInt("shohin_id"),
                        rs.getString("shohin_mei"),
                        rs.getInt("hanbai_tanka"),
                        rs.getInt("shiire_tanka"));
                    items.add(item);
                }
                pstmt.close();
                con.close();
                Gson gson = new Gson();
                response =gson.toJson(items);
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
    public static Connection getConnection() throws ClassNotFoundException, SQLException {
                // Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
                Class.forName("com.mysql.cj.jdbc.Driver");
                return DriverManager.getConnection(
                        "jdbc:mysql://localhost:3306/shop?useSSL=false&serverTimezone=UTC", "root", "Anhhoang94@" );
                        // "jdbc:sqlserver://localhost\\SQLEXPRESS;" +
						// "databaseName=shop;IntegratedSecurity=true;TrustServerCertificate=true;");
                        
            }
}
