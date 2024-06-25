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

public class GetRemainMoney implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        
       try {
            Connection con = ConnectionDB.getConnection();
            if (con != null) {
                System.out.println("connected");
                String response = "";
                String query = "SELECT \n" + //
                                        "    b.id AS budget_id,\n" + //
                                        "    b.period,\n" + //
                                        "    b.amount AS budget_amount,\n" + //
                                        "    COALESCE(SUM(e.amount), 0) AS total_expenses,\n" + //
                                        "    COALESCE(SUM(o.amount), 0) AS total_obligatory_payments,\n" + //
                                        "    COALESCE(SUM(s.amount), 0) AS total_savings,\n" + //
                                        "    b.amount - \n" + //
                                        "        COALESCE(SUM(e.amount), 0) - \n" + //
                                        "        COALESCE(SUM(o.amount), 0) - \n" + //
                                        "        COALESCE(SUM(s.amount), 0) AS remaining_amount\n" + //
                                        "FROM \n" + //
                                        "    Budget b\n" + //
                                        "LEFT JOIN \n" + //
                                        "    Expenses e ON b.id = e.budget_id\n" + //
                                        "LEFT JOIN \n" + //
                                        "    ObligatoryPayments o ON b.id = o.budget_id\n" + //
                                        "LEFT JOIN \n" + //
                                        "    Savings s ON b.id = s.budget_id\n" + //
                                        "GROUP BY \n" + //
                                        "    b.id, b.period, b.amount;\n" + //
                                        "";
                PreparedStatement pstmt = con.prepareStatement(query);
                ResultSet rs = pstmt.executeQuery();
                KakeboClass saving = null ;
                List<KakeboClass> savings = new ArrayList<>();
                while (rs.next()) {

                    String period =rs.getString("period");
                    double budget_amount = rs.getDouble("budget_amount");
                    double total_expenses = rs.getDouble("total_expenses");
                    double total_obligatory_payments = rs.getDouble("total_obligatory_payments");
                    double total_savings = rs.getDouble("total_savings");
                    double remaining_amount = rs.getDouble("remaining_amount");

                    saving = new KakeboClass();
                    saving.setbudget_amount(budget_amount);
                    saving.setremaining_amount(remaining_amount);
                    saving.SetPeriod(period);
                    saving.Settotal_saving(total_savings);
                    saving.Settotal_obligatory_payments(total_obligatory_payments);
                    saving.setTotal_expenses(total_expenses);
                    savings.add(saving);
                }
                pstmt.close();
                con.close();
                Gson gson = new Gson();
                response =gson.toJson(savings);
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
















