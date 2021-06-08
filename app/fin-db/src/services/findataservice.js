import http from "../http-common";

class findataservice{
    /*getall(){
      return http.get(`/${type}`);
    }*/
    getallStock(){
      return http.get("/stocks");
    }
    /*getallBond(){
      return http.get("/bonds");
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
    insertstock(data){
      return http.post("/stocks/insert", data);
    }  
    updatestock(data){
      return http.post("/stocks/update", data);
    }
    deletestock(data){
      return http.post("/stocks/delete", data);
    }
    countstock(data){
      return http.post("/stocks/count", data);
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
    getbysymbol(stock_symbol){
      return http.get(`/stocks/symbol/${stock_symbol}`);
    }


    enter_getbysymbol(stock_symbol){
      return http.get(`/enterprises/${stock_symbol}`);
    }
}
export default new findataservice();