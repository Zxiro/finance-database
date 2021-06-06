import http from "../http-common";

class findataservice{
    create(data) {
      return http.post("/stocks", data);
    }
    updatestock(data){
      return http.post("/stocks/update", data);
    }
    raw_getbysymbol(sql){
      return http.post("/stocks/raw", sql);
    }
    getbysymbol(stock_symbol){
      return http.get(`/stocks/${stock_symbol}`);
    }
}
export default new findataservice();