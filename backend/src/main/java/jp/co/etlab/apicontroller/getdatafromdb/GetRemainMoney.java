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
                String query = """
                WITH TotalExpenses AS (
                    SELECT 
                        b.period,
                        SUM(e.amount) AS total_expenses
                    FROM 
                        dbo.Budget b
                    LEFT JOIN 
                        dbo.Expenses e ON b.id = e.budget_id
                    GROUP BY 
                        b.period
                ),
                TotalObligatoryPayments AS (
                    SELECT 
                        b.period,
                        SUM(op.amount) AS total_obligatory_payments
                    FROM 
                        dbo.Budget b
                    LEFT JOIN 
                        dbo.ObligatoryPayments op ON b.id = op.budget_id
                    GROUP BY 
                        b.period
                ),
                
                TotalSavings AS (
                    SELECT 
                        b.period,
                        SUM(s.amount) AS total_savings
                    FROM 
                        dbo.Budget b
                    LEFT JOIN 
                        dbo.Savings s ON b.id = s.budget_id
                    GROUP BY 
                        b.period
                )
                SELECT 
                    b.period,
                    b.amount AS budget_amount,
                    COALESCE(te.total_expenses, 0) AS total_expenses,
                    COALESCE(topay.total_obligatory_payments, 0) AS total_obligatory_payments,
                    COALESCE(ts.total_savings, 0) AS total_savings,
                    (b.amount - COALESCE(te.total_expenses, 0) - COALESCE(topay.total_obligatory_payments, 0) - COALESCE(ts.total_savings, 0)) AS remaining_amount
                FROM 
                    dbo.Budget b
                LEFT JOIN 
                    TotalExpenses te ON b.period = te.period
                LEFT JOIN 
                    TotalObligatoryPayments topay ON b.period = topay.period
                LEFT JOIN 
                    TotalSavings ts ON b.period = ts.period;
                """;
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
















