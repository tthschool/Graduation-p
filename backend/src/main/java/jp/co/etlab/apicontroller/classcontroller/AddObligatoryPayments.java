package jp.co.etlab.apicontroller.classcontroller;

public class AddObligatoryPayments {
    double amount ;
    String description;
    String payment_date ; 
   public AddObligatoryPayments(double amount ,  String description , String payment_date){
    this.amount = amount;
    this.description = description ; 
    this.payment_date = payment_date ;
   }
}
