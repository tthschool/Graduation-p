package jp.co.etlab.apicontroller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionDB {
     public static Connection getConnection() throws ClassNotFoundException, SQLException {
                //company
                Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
                //home
                // Class.forName("com.mysql.cj.jdbc.Driver");
                return DriverManager.getConnection(
                    //home db conection
                        // "jdbc:mysql://localhost:3306/kakebo?useSSL=false&serverTimezone=UTC", "root", "Anhhoang94@" );

                        //company conection
                        "jdbc:sqlserver://localhost\\SQLEXPRESS;" +
						"databaseName=kakebo;IntegratedSecurity=true;TrustServerCertificate=true;");
                        
            }
}
