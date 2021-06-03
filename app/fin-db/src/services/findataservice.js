import http from "../http-common";

class findataservice{
    create(data) {
      return http.post("/stocks", data);
    }
    getbysymbol(stock_symbol){
      return http.get(`/stocks/${stock_symbol}`);
    }
}

export default new findataservice();