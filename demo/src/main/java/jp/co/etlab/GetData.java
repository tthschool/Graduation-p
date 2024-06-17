// package jp.co.etlab;

// import java.io.IOException;
// import java.sql.Connection;
// import java.sql.DriverManager;
// import java.sql.SQLException;

// import javax.servlet.ServletException;
// import javax.servlet.annotation.WebServlet;
// import javax.servlet.http.HttpServlet;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// @WebServlet("/GetData")
// public class GetData extends HttpServlet {
//     private static final long serialVersionUID = 1L;

//     protected void doPost(HttpServletRequest request, HttpServletResponse response)
//             throws ServletException, IOException {
//         request.setCharacterEncoding("UTF-8");
//         String fdata = request.getParameter("abc");
//         String name = request.getParameter("ccd");
//         System.out.println("form-data:" + fdata);
//         System.out.println("form-data:" + name);
//         try {
//             Connection con = getConnection();
//             if (con != null) {
//                 System.out.println("yes");
//                 con.close();
//             }
//         } catch (ClassNotFoundException | SQLException e) {
//             e.printStackTrace();
//         }
//     }

//     public static Connection getConnection() throws ClassNotFoundException, SQLException {
//         Class.forName("com.mysql.cj.jdbc.Driver");
//         return DriverManager.getConnection(
//                 "jdbc:mysql://localhost:3306/laravel?useSSL=false&serverTimezone=UTC", "root", "Anhhoang94@");
//     }
    
// }
