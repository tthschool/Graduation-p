package jp.co.etlab;
import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpServer;

import jp.co.etlab.apicontroller.AddItem;
import jp.co.etlab.apicontroller.GetAllItems;
public class WebServer {
    public  void StartServer() throws IOException 
    {   
        // Create an HttpServer instance
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
 
        // Create a context for a specific path and set the handler
        server.createContext("/getAllItems", new GetAllItems());
        server.createContext("/addItem", new AddItem());
        // Start the server
        server.setExecutor(null); // Use the default executor
        server.start();
 
        System.out.println("Server is running on port 8000");
    }
}
