package jp.co.etlab.apicontroller.classcontroller;


public class KakeboClass {
    double amount ;
    String description;
    String payment_date ; 
    String period ;
    String Start_date ;
    Boolean current_month ;
    String saving_date ;
    String TickerSymbol ; 
    double PurchasePrice ; 
    String PurchaseDate ;
    int Quantity ; 
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
    public void SetStartdate(String Start_date){
        this.Start_date = Start_date ; 
    }
    public void SetCurrentMonth(Boolean current_month){
        this.current_month = current_month ;
    }
    public void SetSavingDate(String savingdate){
        this.saving_date = savingdate;
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



