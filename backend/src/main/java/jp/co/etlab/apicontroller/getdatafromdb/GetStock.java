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

public class GetStock implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        
       try {
            Connection con = ConnectionDB.getConnection();
            if (con != null) {
                System.out.println("connected");
                String response = "";
                String query = "select * from Stocks ";
                PreparedStatement pstmt = con.prepareStatement(query);
                ResultSet rs = pstmt.executeQuery();
                List<KakeboClass> Stocks = new ArrayList<>();
                // SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                KakeboClass Stock  = null ;
                while (rs.next()) {
                    String ticker_symbol = rs.getString("TickerSymbol");
                    String purchaseDate = rs.getString("PurchaseDate");
                    double price = rs.getDouble("PurchasePrice");
                    int quantity = rs.getInt("Quantity");
                    Stock = new KakeboClass();
                    Stock.setPurchaseDate(purchaseDate);
                    Stock.setTickerSymbol(ticker_symbol);
                    Stock.setPurchasePrice(price);
                    Stock.setQuantity(quantity);
                    Stocks.add(Stock);
                }
                pstmt.close();
                con.close();
                Gson gson = new Gson();
                response =gson.toJson(Stocks);
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

