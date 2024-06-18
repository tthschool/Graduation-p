package jp.co.etlab.apicontroller;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class AddItem implements HttpHandler {
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

                String data = requestData.getData();
                String content = requestData.getContent();
                System.out.println(data);
                System.out.println(content);
                // Nội dung trả về cho client
                // String response = "Received: " + requestBody;

                // // Thiết lập mã trạng thái và độ dài của nội dung trả về
                // exchange.sendResponseHeaders(200, response.getBytes(StandardCharsets.UTF_8).length);

                // // Lấy OutputStream để ghi nội dung trả về
                // OutputStream os = exchange.getResponseBody();
                // os.write(response.getBytes(StandardCharsets.UTF_8));
                // os.close();
            } else {
                exchange.sendResponseHeaders(405, -1); // 405 Method Not Allowed
            }
    //    try {
    //         Connection con = getConnection();
    //         if (con != null) {
    //             String response = "";
    //             String query = "select * from items";
    //             PreparedStatement pstmt = con.prepareStatement(query);
    //             ResultSet rs = pstmt.executeQuery();
    //             List<Item> items =  new ArrayList<>() ;
    //             while (rs.next()) {
    //                 Item item = new Item(
    //                     rs.getInt("shohin_id"),
    //                     rs.getString("shohin_mei"),
    //                     rs.getInt("hanbai_tanka"),
    //                     rs.getInt("shiire_tanka"));
    //                 items.add(item);
    //             }
    //             pstmt.close();
    //             con.close();
    //             Gson gson = new Gson();
    //             response =gson.toJson(items);
    //             exchange.getResponseHeaders().add("Content-Type", "application/json");
    //             exchange.sendResponseHeaders(200, response.getBytes().length);
    //             OutputStream os = exchange.getResponseBody();
    //             os.write(response.getBytes());
    //             os.close();
    //         }
    //     } catch (ClassNotFoundException | SQLException e) {
    //         e.printStackTrace();
    //     }
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
