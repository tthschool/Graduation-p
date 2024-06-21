package jp.co.etlab.apicontroller.classcontroller;

public class TotalSpend {
    String payment_date ;
    String description;
    double total_amount ;
    public  TotalSpend(String payment_date ,String description, double total_amount){
        this.payment_date = payment_date ;
        this.total_amount = total_amount;
        this.description = description;
    }
}
