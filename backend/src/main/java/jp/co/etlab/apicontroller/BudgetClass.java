package jp.co.etlab.apicontroller;

public class BudgetClass {
    int id ;
    String period ;
    double total_amount;
    String Start_date ;
    String End_date ;
    public  BudgetClass(int id , String period , double total_amount , String Start_date ,  String End_date){
        this.id  = id ;
        this.period =  period ; 
        this.total_amount =  total_amount  ; 
        this.Start_date = Start_date ; 
        this.End_date = End_date;
    }
}
