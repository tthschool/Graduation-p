package jp.co.etlab;
import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpServer;

import jp.co.etlab.apicontroller.adddatatodatabase.AddBudGet;
import jp.co.etlab.apicontroller.adddatatodatabase.AddExpenses;
import jp.co.etlab.apicontroller.adddatatodatabase.AddObligatoryPayments;
import jp.co.etlab.apicontroller.adddatatodatabase.AddSaving;
import jp.co.etlab.apicontroller.getdatafromdb.GetRemainMoney;
import jp.co.etlab.apicontroller.getdatafromdb.GetSaving;
import jp.co.etlab.apicontroller.getdatafromdb.GetStock;
import jp.co.etlab.apicontroller.getdatafromdb.GetTotalSpend;
import jp.co.etlab.apicontroller.getdatafromdb.ObligatoryPayments;
public class WebServer {
    public  void StartServer() throws IOException 
    {   
        // Create an HttpServer instance
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
 
        // Create a context for a specific path and set the handler
        server.createContext("/getSaving", new GetSaving());
        server.createContext("/getTotalSpend", new GetTotalSpend());
        server.createContext("/ObligatoryPayments", new ObligatoryPayments());
        server.createContext("/GetStock", new GetStock());
        server.createContext("/GetRemainMoney", new GetRemainMoney());
        
        server.createContext("/AddObligatoryPayments", new AddObligatoryPayments());
        server.createContext("/addExpenses", new AddExpenses());
        server.createContext("/addBudget", new AddBudGet());
        server.createContext("/AddSaving", new AddSaving());
        // Start the server
        server.setExecutor(null); // Use the default executor
        server.start();
 
        System.out.println("Server is running on port 8000");
    }
}   
