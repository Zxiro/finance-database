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
    sumstockvolume(){
      return http.get("/stocks/sum");
    }
    havingmaxoptionpricestock(){
      return http.get('/stocks/having');
    }
    notexiststockoption(stock_symbol){
      return http.get(`/stocks/exist/${stock_symbol}`);
    }
    rawstockdml(sql){
      return http.post("/stocks/raw/dml", sql);
    }
    rawstockddl(sql){
      return http.post("/stocks/raw/ddl", sql);
    }
    raw_getbysymbol(sql){
      return http.post("/stocks/raw", sql);
    }

    getallEnterprise(){
      return http.get("/enterprises");
    }
    getenterprisebysymbol(enterprise_symbol){
      return http.get(`/enterprises/symbol/${enterprise_symbol}`);
    }
    getenterprisebyInsymbol(data){
      return http.post("/enterprises/in", data);
    }
    getenterprisebyNotInsymbol(data){
      return http.post("/enterprises/not_in", data);
    }
    insertenterprise(data){
      return http.post("/enterprises/insert", data);
    }  
    updateenterprise(data){
      return http.post("/enterprises/update", data);
    }
    deleteenterprise(data){
      return http.post("/enterprises/delete", data);
    }
    countenterprise(){
      return http.post("/enterprises/count");
    }
    havingmaxopcashenterprise(){
        return http.get('/enterprises/having');
    }
    existenterprisebond(enterprise_symbol){
      return http.get(`/enterprises/exist/${enterprise_symbol}`);
    }
    rawenterprisedml(sql){
      return http.post("/enterprises/raw/dml", sql);
    }
    rawenterpriseddl(sql){
      return http.post("/enterprises/raw/ddl", sql);
    }
    /*raw_getbysymbol(sql){
      return http.post("/enterprises/raw", sql);
    }*/

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
    rawbonddml(sql){
      return http.post("/bonds/raw/dml", sql);
    }
    rawbondddl(sql){
      return http.post("/bonds/raw/ddl", sql);
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
    rawoptiondml(sql){
      return http.post("/options/raw/dml", sql);
    }
    rawoptionddl(sql){
      return http.post("/options/raw/ddl", sql);
    }

    getallFuture(){
      return http.get("/futures");
    }
    getfuturebysymbol(future_symbol){
      return http.get(`/futures/symbol/${future_symbol}`);
    }
    getfuturebyInsymbol(data){
      return http.post("/futures/in", data);
    }
    getfuturebyNotInsymbol(data){
      return http.post("/futures/not_in", data);
    }
    insertfuture(data){
      return http.post("/futures/insert", data);
    }  
    updatefuture(data){
      return http.post("/futures/update", data);
    }
    deletefuture(data){
      return http.post("/futures/delete", data);
    }
    countfuture(data){
      return http.post("/futures/count", data);
    }
    maxfutureprice(){
      return http.get("/futures/max");
    }
    minfutureprice(){
      return http.get("/futures/min");
    }
    avgfutureprice(){
      return http.get("/futures/avg")
    }
    rawfuturedml(sql){
      return http.post("/futures/raw/dml", sql);
    }
    rawfutureddl(sql){
      return http.post("/futures/raw/ddl", sql);
    }
    
}
export default new findataservice();