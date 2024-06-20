package jp.co.etlab.apicontroller.classcontroller;

public class BudgetClass {
    int id ;
    String period ;
    double total_amount;
    String Start_date ;
    Boolean current_month ;
    public  BudgetClass(int id , String period , double total_amount , String Start_date , Boolean current_month){
        this.id  = id ;
        this.period =  period ; 
        this.total_amount =  total_amount  ; 
        this.Start_date = Start_date ; 
        this.current_month = current_month;
    }
}
