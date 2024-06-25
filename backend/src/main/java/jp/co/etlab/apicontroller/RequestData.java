package jp.co.etlab.apicontroller;


public class RequestData {
    private String period;
    private double amount;
    private String payment_date ;
    private String describe  ;
    private String start_date ;
    private String End_date ;
    private String TickerSymbol ; 
    private double PurchasePrice ; 
    private String PurchaseDate ;
    private int Quantity ; 
    // Getters and setters
    public String GetTickerSymbol(){
        return TickerSymbol;
    }
    public double getPurchasePrice(){
        return PurchasePrice;
    }
    public String getPurchaseDate(){
        return PurchaseDate;
    }
    public int getQuantity(){
        return Quantity;
    }
    public String getPeriod() {
        return period;
    }
    public double Getamount() {
        return amount;
    }
    public String Getpayment_date() {
        return payment_date;
    }
    public String Describe(){
        return describe;
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
    public void Setdescribe(String describe){
        this.describe = describe ; 
    }
    public void setStartDate(String startdate){
        this.start_date = startdate;
    }
    public void setEnd_date(String end_date){
        this.End_date = end_date ; 
    }
    public void setTickerSymbol(String tickerSymbol){
         this.TickerSymbol = tickerSymbol ;
    }
    public void setPurchasePrice(double PurchasePrice){
        this.PurchasePrice = PurchasePrice;
    }
    public void setPurchaseDate(String purchaseDate){
        this.PurchaseDate = purchaseDate;
    }
    public void setQuantity(int Quantity){
        this.Quantity = Quantity;
    }
}
