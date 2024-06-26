package jp.co.etlab.apicontroller.adddatatodatabase;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import jp.co.etlab.apicontroller.RequestData;
import jp.co.etlab.apicontroller.dbconection.ConnectionDB;

public class AddExpenses implements HttpHandler {
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
            String payment_date = requestData.Getpayment_date();
            double amount = requestData.Getamount();
            String Describle = requestData.Describe();
            String period = requestData.getPeriod();
            try {
                Connection con = ConnectionDB.getConnection();
                String query = null;
                String queryfindbudgetid = null;
                PreparedStatement pstmt = null;
                int Budget_id = -1;
                ResultSet rs = null;
                int result = 0;
                if (con != null) {
                    queryfindbudgetid = "select id from Budget where period = ?";
                    pstmt = con.prepareStatement(queryfindbudgetid);
                    pstmt.setString(1, period);
                    rs = pstmt.executeQuery();
                    while (rs.next()) {
                        Budget_id = rs.getInt("id");
                    }
                    if (Budget_id != -1) {
                        query = "insert into Expenses ( description , amount , date , budget_id  ) values (? , ?  , ?  , ?) ";
                        pstmt = con.prepareStatement(query);
                        pstmt.setString(1, Describle);
                        pstmt.setDouble(2, amount);
                        pstmt.setString(3, payment_date);
                        pstmt.setInt(4, Budget_id);
                        result = pstmt.executeUpdate();
                        if (result != 0) {
                            String response = "succsessfull";
                            // Thiết lập mã trạng thái và độ dài của nội dung trả về
                            exchange.sendResponseHeaders(200, response.getBytes(StandardCharsets.UTF_8).length);
                            // Lấy OutputStream để ghi nội dung trả về
                            OutputStream os = exchange.getResponseBody();
                            os.write(response.getBytes(StandardCharsets.UTF_8));
                            os.close();
                        }
                    }
                    else{
                        String response = "you have to add budget first";
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
