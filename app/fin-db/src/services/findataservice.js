import http from "../http-common";

class findataservice{
    getallStock(){
      return http.get("/stocks");
    }
    getstockbysymbol(stock_symbol){
      return http.get(`/stocks/symbol/${stock_symbol}`);
    }
    getstockbyInsymbol(data){
      return http.post("/stocks/in", data);
    }
    getstockbyNotInsymbol(data){
      return http.post("/stocks/not_in", data);
    }
    insertstock(data){
      return http.post("/stocks/insert", data);
    }  
    updatestock(data){
      return http.post("/stocks/update", data);
    }
    deletestock(data){
      return http.post("/stocks/delete", data);
    }
    countstock(){
      return http.post("/stocks/count");
    }
    maxstockprice(){
      return http.get("/stocks/max");
    }
    minstockprice(){
      return http.get("/stocks/min");
    }
    raw_getbysymbol(sql){
      return http.post("/stocks/raw", sql);
    }



    getallBond(){
      return http.get("/bonds");
    }
    getbondbysymbol(bond_symbol){
      return http.get(`/bonds/symbol/${bond_symbol}`);
    }
    getbondbyInsymbol(data){
      return http.post("/bonds/in", data);
    }
    getbondbyNotInsymbol(data){
      return http.post("/bonds/not_in", data);
    }
    insertbond(data){
      return http.post("/bonds/insert", data);
    }  
    updatebond(data){
      return http.post("/bonds/update", data);
    }
    deletebond(data){
      return http.post("/bonds/delete", data);
    }
    countbond(data){
      return http.post("/bonds/count", data);
    }
    maxbondprice(){
      return http.get("/bonds/max");
    }
    minbondprice(){
      return http.get("/bonds/min");
    }
    avgbondprice(){
      return http.get("/bonds/avg")
    }

    getallOption(){
      return http.get("/options");
    }
    getoptionbysymbol(option_symbol){
      return http.get(`/options/symbol/${option_symbol}`);
    }
    getoptionbyInsymbol(data){
      return http.post("/options/in", data);
    }
    getoptionbyNotInsymbol(data){
      return http.post("/options/not_in", data);
    }
    insertoption(data){
      return http.post("/options/insert", data);
    }  
    updateoption(data){
      return http.post("/options/update", data);
    }
    deleteoption(data){
      return http.post("/options/delete", data);
    }
    countoption(data){
      return http.post("/options/count", data);
    }
    maxoptionprice(){
      return http.get("/options/max");
    }
    minoptionprice(){
      return http.get("/options/min");
    }
    avgoptionprice(){
      return http.get("/options/avg")
    }
    /*getallEnterprise(){
      return http.get("/");
    }
    getallOption(){
      return http.get("/");
    }
    getallFuture(){
      return http.get("/");
    } */ 
    


    enter_getbysymbol(stock_symbol){
      return http.get(`/enterprises/${stock_symbol}`);
    }
}
export default new findataservice();