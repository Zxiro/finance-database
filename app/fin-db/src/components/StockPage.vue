<template>
    <div class="submit-form">
      <div v-if="!action_done">
        <div class="container-fluid p-0">
          <nav class="navbar navbar-dark navbar-expand bg-primary mb-3">
            <span class="navbar-brand mb-0 h1">Update</span>
          </nav>
            <div id = "insert" class="row justify-content-center">
              <div v-for="(feature, index) in stock_data"
                :key = "index" class = "col col-lg">  
                <label class="col col-md-12">{{index}}</label>
                  <div class="col col-lg-12">
                    <input
                      type="text"
                      class="form-control"
                      required
                      v-model="stock_data[index]"
                      name="insert-stock-symbol"
                    />
                </div>
            </div>
          </div>
          <div class = "form-group col text-center mt-4">
            <button id = "update" class="btn btn-success row-sm-4" type="button"
              @click="updateStock">
              Update
            </button>
          </div>
          <nav class="navbar navbar-dark navbar-expand bg-primary mb-3">
                <span class="navbar-brand mb-0 h1">Delete NOT EXIST</span>
          </nav>
            <div id = "delete" class="row justify-content-center">  
                <label class="col col-lg-2">stock_symbol</label>
                  <div class="col col-lg-3">
                    <input
                      type="text"
                      class="form-control"
                      required
                      v-model="stock_data.stock_symbol"
                      name="delete-stock-symbol"
                    />
                  </div>
            </div>
            <div class = "form-group col text-center mt-4">
                <button class="btn btn-success row-sm-4" type="button"
                  @click="deleteStock">
                  Delete
                </button>
                <button @click="notexistStockOption" class="btn btn-success row-sm-4">NOT EXIST option</button>
            </div>
          <div class="input-group mb-3 justify-content-center">
          <input type="text" class="form-control col-sm-8" placeholder="Execute by raw SQL"
            v-model="dml_sql"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="rawStockDml()">
              Execute
            </button>
          </div>
          </div>
          <div>
          <label><strong>Ans:</strong></label>{{dml_ans}}
        </div>
          <nav class="navbar navbar-dark navbar-expand bg-primary mb-1">
              <span class="navbar-brand mb-0 h1">Stock Data</span>
          </nav>
          <div class = "form-group col text-center mt-4">
            <button @click="countStock" class="btn btn-success row-sm-4">COUNT</button>
            <button @click="havingMaxOptionPriceStock" class="btn btn-success row-sm-4">HAVING Max Op cash</button>
            <button @click="maxStockPrice" class="btn btn-success row-sm-4">MAX</button>
            <button @click="minStockPrice" class="btn btn-success row-sm-4">MIN</button>
            <button @click="sumStockVolume" class="btn btn-success row-sm-4">SUM of Volume</button>
          </div>
          <div class="input-group mb-3 justify-content-center">
          <input type="text" class="form-control col-sm-8" placeholder="Search by raw SQL"
            v-model="ddl_sql"/>
          <div class="input-group-append ">
            <button class="btn btn-outline-secondary" type="button"
              @click="rawStockDdl()">
              Search
            </button>
          </div>
          </div>
        <div>
          <label><strong>Ans:</strong></label>{{ddl_ans}}
        </div>
        </div>
        <div>
          <table class="table table table-dark table-hover">
            <thead>
              <tr>
                <th
                  v-for="(feature, index) in entities[0]"
                  :key = "index"
                >{{index}}</th></tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in entities"
                :key = "index"
              ><td v-for="(attr, index_) in product"
                :key = "index_">{{attr}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <h4>Operation finished!</h4>
        <button class="btn btn-success" @click="newStock">Return</button>
      </div>
    </div>
</template>

<script>
import findataservice from "../services/findataservice.js";

export default {
    name: "add-stock",
    data(){
      return{
        entities:[],
        stock_data:{
        stock_symbol: "",
        open_price: "",
        close_price: "",
        high_price: "",
        low_price: "",
        volume:"",
        enterprise_symbol: ""
        },
        dml_sql:"",
        ddl_sql:"",
        dml_ans:"",
        ddl_ans:"",
        action_done: false
      };// The data set that is going to pass to the server
    },
    methods: {
      getalldata(){
        findataservice.getallStock()
            .then(response => {
              this.entities = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
        });
      },
      newStock(){
        this.action_done = false;
        this.stock_data = {
        stock_symbol: "",
        open_price: "",
        close_price: "",
        high_price: "",
        low_price: "",
        volume:"",
        enterprise_symbol: ""
        };
        this.dml_sql="",
        this.ddl_sql="";
        this.getalldata();
      },
      updateStock(){
        var data = {
            stock_symbol: this.stock_data.stock_symbol,
            open_price: this.stock_data.open_price,
            close_price: this.stock_data.close_price,
            high_price: this.stock_data.high_price,
            low_price: this.stock_data.low_price
        };
        findataservice.updatestock(data) 
        .then( response => {
            console.log(response.data);
            response.end;
            this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      deleteStock(){
        var data = {
            stock_symbol: this.stock_data.stock_symbol,
        };
        findataservice.deletestock(data) 
        .then( response => {
            console.log(response.data);
            response.end;
            this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      countStock(){
        findataservice.countstock() 
        .then( response => {
          this.ddl_ans = 'SQL Ans: '+response.data['count'];
          response.end;
          this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      maxStockPrice(){
        findataservice.maxstockprice() 
        .then( response => {
          this.ddl_ans = 'SQL Ans: '+response.data['max']
          console.log(this.ddl_ans);
          this.action_done = true;
          response.end;
         
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      minStockPrice(){
        findataservice.minstockprice() 
        .then( response => {
          this.ddl_ans = 'SQL Ans: '+response.data['min']
          console.log(response.data);
          response.end;
          this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      sumStockVolume(){
        findataservice.sumstockvolume() 
        .then( response => {
          this.ddl_ans = 'SQL Ans: '+response.data['vol']
          console.log(response.data);
          response.end;
          this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      havingMaxOptionPriceStock(){
          findataservice.havingmaxoptionpricestock() 
        .then( response => {
          console.log(response);
          this.action_done = true;
          this.ddl_ans = 'SQL Ans: '+response.data['result']
          console.log(response.data);
          response.end;
          this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      notexistStockOption(){
        var stock_symbol = this.stock_data.stock_symbol
        findataservice.notexiststockoption(stock_symbol) 
        .then( response => {
          var tmp = response.data['res'][0]
          if(Object.keys(tmp).length == 1){ //Does not exist
            this.dml_ans = 'stock: '+stock_symbol+' does not publish option'
            response.end;
            this.action_done = true;
          }
          else{
            this.dml_ans = 'stock: '+stock_symbol+' does publish option'
            response.end;
            this.action_done = true;
          }
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      // DELETE FROM stocks WHERE stock_symbol = 2303
      // UPDATE stocks SET open_price = 7777 WHERE stock_symbol = 2454
      // SELECT stock_symbol FROM stocks 
      // WHERE NOT EXISTS (SELECT * FROM options WHERE options.stock_symbol=2454) 
      // AND stocks.stock_symbol = 2454      
      //SELECT stock_symbol FROM stocks WHERE NOT EXISTS (SELECT * FROM options WHERE options.stock_symbol=2454)  AND stocks.stock_symbol = 2454 
      rawStockDml(){
        var sql = {
          sql:this.dml_sql
        }
        findataservice.rawstockdml(sql)
        .then(response => {
          if(response.data['res'][0].length != 0){
            this.dml_ans = 'stock: '+response.data['res'][0][0]['stock_symbol']+' does not publish option'
            response.end;
            this.action_done = true;
          }
          response.end;
          this.action_done = true;
        })
        .catch(e => {
          console.log(e);
        });
      },
      //SELECT count(*) AS "count" FROM "stocks" AS "stock" WHERE "stock"."stock_symbol" IS NOT NULL;
      //SELECT max("close_price") AS "max" FROM "stocks" AS "stock";
      //SELECT min("close_price") AS "min" FROM "stocks" AS "stock";
      //SELECT sum("volume") AS "sum" FROM "stocks" AS "stock";
      //SELECT max("option"."open_price") AS "result", "stock"."stock_symbol" AS "stock.stock_symbol", "stock"."open_price" AS "stock.open_price", "stock"."close_price" AS "stock.close_price", "stock"."high_price" AS "stock.high_price", "stock"."low_price" AS "stock.low_price", "stock"."volume" AS "stock.volume", "stock"."enterprise_symbol" AS "stock.enterprise_symbol" FROM "options" AS "option" LEFT OUTER JOIN "stocks" AS "stock" ON "option"."stock_symbol" = "stock"."stock_symbol" GROUP BY "stock"."stock_symbol" LIMIT 1;
      rawStockDdl(){
        var sql = {
          sql:this.ddl_sql
        }
        findataservice.rawstockddl(sql)
        .then(response => {
          for (var key in response.data["res"][0][0]){
            console.log(key)
            this.ddl_ans = 'SQL Ans: '+ response.data["res"][0][0][key]
            break
          }
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
      }
    },
    mounted(){
      this.getalldata()
    }
};

</script>

<style>
  .submit-form {
    width:100%;
    margin: auto;
  }
  .form-check-input {
    -webkit-print-color-adjust: exact;
  }
  body {
      text-size-adjust: 100%;
  }
  th {
      text-align: match-parent;
  }
  .btn-success{
    margin-left: 10px;
    mr:10px;
  }
</style>