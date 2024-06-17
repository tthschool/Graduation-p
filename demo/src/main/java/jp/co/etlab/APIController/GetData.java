// package jp.co.etlab.APIController;

// import java.io.IOException;
// import java.sql.Connection;
// import java.sql.DriverManager;
// import java.sql.PreparedStatement;
// import java.sql.ResultSet;
// import java.sql.SQLException;
// import java.util.ArrayList;
// import java.util.List;
// import java.io.IOException;
// import java.io.OutputStream;

// import com.sun.net.httpserver.HttpExchange;
// import com.sun.net.httpserver.HttpHandler;

// import jp.co.etlab.ItemsClass.Item;

// public class GetData implements HttpHandler {
//     public void handle(HttpExchange exchange) throws IOException {
//        try {
//             Connection con = getConnection();
//             if (con != null) {
//                 String query = "select * from shohin";
//                 PreparedStatement pstmt = con.prepareStatement(query);
//                 pstmt.close();
//                 pstmt.setInt(1, 1000);
//                 ResultSet rs = pstmt.executeQuery();
//                  List<Item> items =  new ArrayList<>() ;
//                 while (rs.next()) {
//                     // System.out.printf("id:%s\tname:%s   \thanbai:%d\tshiire:%d\n",
//                     //         rs.getString("shohin_id"), rs.getString("shohin_mei"),
//                     //         rs.getInt("hanbai_tanka"), rs.getInt("shiire_tanka"));
//                     Item item = new Item(
//                         rs.getInt(0)
//                     )
//                 }
//                 pstmt.close();
//                 con.close();
//             }
//         } catch (ClassNotFoundException | SQLException e) {
//             e.printStackTrace();
//         }
//     }
//     public static Connection getConnection() throws ClassNotFoundException, SQLException {
//                 Class.forName("com.mysql.cj.jdbc.Driver");
//                 return DriverManager.getConnection(
//                         // "jdbc:mysql://localhost:3306/laravel?useSSL=false&serverTimezone=UTC", "root", "Anhhoang94@");
//                         "jdbc:sqlserver://localhost\\SQLEXPRESS;" +
// 						"databaseName=shop;IntegratedSecurity=true;TrustServerCertificate=true;");
                        
//             }
// }
