package jp.co.etlab;
import com.sun.net.httpserver.HttpServer;

import jp.co.etlab.APIController.GetAllItems;
import jp.co.etlab.APIController.HomePage;
 
import java.io.IOException;
import java.net.InetSocketAddress;
public class WebServer {
    public  void StartServer() throws IOException 
    {   
        // Create an HttpServer instance
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
 
        // Create a context for a specific path and set the handler
        server.createContext("/", new HomePage());
        server.createContext("/getAllItems", new GetAllItems());
        // Start the server
        server.setExecutor(null); // Use the default executor
        server.start();
 
        System.out.println("Server is running on port 8000");
    }
}
