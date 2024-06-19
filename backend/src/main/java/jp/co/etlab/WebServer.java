package jp.co.etlab;
import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpServer;

import jp.co.etlab.apicontroller.adddatatodatabase.AddBudGet;
import jp.co.etlab.apicontroller.getdatafromdb.GetBudGet;
import jp.co.etlab.apicontroller.getdatafromdb.GetSaving;
import jp.co.etlab.apicontroller.getdatafromdb.GetTotalSpend;
import jp.co.etlab.apicontroller.getdatafromdb.GetallBudget;
import jp.co.etlab.apicontroller.getdatafromdb.ObligatoryPayments;
public class WebServer {
    public  void StartServer() throws IOException 
    {   
        // Create an HttpServer instance
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
 
        // Create a context for a specific path and set the handler
        server.createContext("/GetBudget", new GetBudGet());
        server.createContext("/getSaving", new GetSaving());
        server.createContext("/getAllBudget", new GetallBudget());
        server.createContext("/getTotalSpend", new GetTotalSpend());
        server.createContext("/ObligatoryPayments", new ObligatoryPayments());

        server.createContext("/addBudget", new AddBudGet());
        // Start the server
        server.setExecutor(null); // Use the default executor
        server.start();
 
        System.out.println("Server is running on port 8000");
    }
}   
