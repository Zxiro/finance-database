import http from "../http-common";

class findataservice{
    create(data) {
        return http.post("/stocks", data);
      }
}

export default new findataservice();