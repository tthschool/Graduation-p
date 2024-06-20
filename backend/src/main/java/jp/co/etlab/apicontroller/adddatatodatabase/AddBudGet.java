package jp.co.etlab.apicontroller.adddatatodatabase;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import jp.co.etlab.apicontroller.RequestData;
import jp.co.etlab.apicontroller.dbconection.ConnectionDB;

public class AddBudGet implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equals(exchange.getRequestMethod())) {
                // Đọc dữ liệu từ yêu cầu POST
                InputStream is = exchange.getRequestBody();
                StringBuilder sb = new StringBuilder();
                int i;
                while ((i = is.read()) != -1) {
                    sb.append((char) i);
                }
                String requestBody = sb.toString();
                Gson gson = new Gson();
                RequestData requestData = gson.fromJson(requestBody, RequestData.class);
                System.out.println(requestData.getPeriod());
                System.out.println(requestData.Getamount());
                String period  = requestData.getPeriod();
                double amount = requestData.Getamount();
                try {
                        Connection con =ConnectionDB.getConnection();
                        String query = null ; 
                        PreparedStatement pstmt = null ; 
                        int rs = 0 ;
                        if (con != null) {
                            //set current month to next month
                            query = "update  Budget set current_month= 0 where current_month = 1 ;";
                            pstmt = con.prepareStatement(query);
                            rs = pstmt.executeUpdate();
                            pstmt.close();
                            query  = "insert into Budget (period , total_amount ) values (? , ?  ) ";
                            pstmt = con.prepareStatement(query);
                            pstmt.setString(1, period);
                            pstmt.setDouble(2, amount);
                            rs = pstmt.executeUpdate(); 
                            if (rs != 0) {
                                   
                                    String response = "succsessfull";
                                    // Thiết lập mã trạng thái và độ dài của nội dung trả về
                                    exchange.sendResponseHeaders(200, response.getBytes(StandardCharsets.UTF_8).length);
                                    // Lấy OutputStream để ghi nội dung trả về
                                    OutputStream os = exchange.getResponseBody();
                                    os.write(response.getBytes(StandardCharsets.UTF_8));
                                    os.close();
                            }    
                        }
                } catch (ClassNotFoundException | SQLException e) {
                    e.printStackTrace();
                }
        } else {
            exchange.sendResponseHeaders(405, -1); // 405 Method Not Allowed
        }
    }
}
