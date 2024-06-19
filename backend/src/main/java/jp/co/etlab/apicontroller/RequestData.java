package jp.co.etlab.apicontroller;

public class RequestData {
    private String period;
    private double amount;
    private String payment_date ;
    private String describle  ;
    private String start_date ;
    private String End_date ;

    // Getters and setters
    public String getPeriod() {
        return period;
    }
    public double Getamount() {
        return amount;
    }
    public String Getpayment_date() {
        return payment_date;
    }
    public String Describle(){
        return describle;
    }
    public String getStartDate(){
        return start_date;
    }
    public String getEnd_date(){
        return End_date;
    }
    public void setPeriod(String period) {
        this.period = period;
    }
    public void setamount(double  amount) {
        this.amount = amount;
    }
    public void setPayment_date(String payment_date){
        this.payment_date = payment_date;
    }
    public void setDiscrible(String discrible){
        this.describle = discrible ; 
    }
    public void setStartDate(String startdate){
        this.start_date = startdate;
    }
    public void setEnd_date(String end_date){
        this.End_date = end_date ; 
    }
}
