package jp.co.etlab.apicontroller.classcontroller;

public class SavingPeriod {
    String description ;
    double amount ;
    String saving_date ;
    public  SavingPeriod(String desciption ,String saving_date , double amount){
        this.description = desciption ;
        this.saving_date = saving_date;
        this.amount = amount;
    }
}
