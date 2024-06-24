package jp.co.etlab.apicontroller.classcontroller;


public class KakeboClass {
    double amount ;
    String description;
    String payment_date ; 
    String period ;
    double total_amount;
    String Start_date ;
    Boolean current_month ;
    String saving_date ;
    public void Setamount(Double amount){
        this.amount = amount;
    }
    public void SetDescription(String description){
        this.description= description;
    }
    public void SetPayment_date(String payment_date){
        this.payment_date = payment_date;
    }
    public void SetPeriod(String period){
        this.period = period ;
    }
    public void SetTotal_amount(Double total_amount){
        this.total_amount = total_amount ;
    }
    public void SetStartdate(String Start_date){
        this.Start_date = Start_date ; 
    }
    public void SetCurrentMonth(Boolean current_month){
        this.current_month = current_month ;
    }
    public void SetSavingDate(String savingdate){
        this.saving_date = savingdate;
    }
}



