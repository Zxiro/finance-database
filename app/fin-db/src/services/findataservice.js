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
    create(data) {
      return http.post("/stocks", data);
    }
    createEnterprise(data) {
      return http.post("/enterprises", data);
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
    raw_getbysymbol(sql){
      return http.post("/stocks/raw", sql);
    }
    getbysymbol(stock_symbol){
      return http.get(`/stocks/${stock_symbol}`);
    }
}
export default new findataservice();