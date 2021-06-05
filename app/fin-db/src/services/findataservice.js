import http from "../http-common";

class findataservice{
    create(data) {
      return http.post("/stocks", data);
    }
    raw_getbysymbol(sql){
      return http.post("/stocks/raw", sql);
    }
    /*getbysymbol(stock_symbol){
      return http.post("/stocks", stock_symbol);
    }*/
}
export default new findataservice();