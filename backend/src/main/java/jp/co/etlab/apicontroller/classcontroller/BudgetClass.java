package jp.co.etlab.apicontroller.classcontroller;

public class BudgetClass {
    int id ;
    String period ;
    double total_amount;
    String Start_date ;
    Boolean valid ;
    public  BudgetClass(int id , String period , double total_amount , String Start_date , Boolean valid){
        this.id  = id ;
        this.period =  period ; 
        this.total_amount =  total_amount  ; 
        this.Start_date = Start_date ; 
        this.valid = valid;
    }
}
