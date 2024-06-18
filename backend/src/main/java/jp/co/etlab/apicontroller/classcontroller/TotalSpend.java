package jp.co.etlab.apicontroller.classcontroller;

public class TotalSpend {
    String period ;
    String description;
    double total_amount ;
    public  TotalSpend(String period ,String description, double total_amount){
        this.period = period ;
        this.total_amount = total_amount;
        this.description = description;
    }
}
