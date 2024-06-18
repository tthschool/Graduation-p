package jp.co.etlab.apicontroller.classcontroller;

public class Expenses {
    String description ;
    double amount ;
    String date ; 
    public Expenses(String description  , double amount ,  String date){
        this.description = description ; 
        this.amount = amount ; 
        this.date = date ;
    }
}
