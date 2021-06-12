<template>
    <div class="submit-form">
      <div v-if="!action_done">
        <div class="container-fluid p-0">
          <nav class="navbar navbar-dark navbar-expand bg-primary mb-3">
            <span class="navbar-brand mb-0 h1">Update</span>
          </nav>
            <div id = "insert" class="row justify-content-center">
              <div v-for="(feature, index) in future_data"
                :key = "index" class = "col col-lg">  
                <label class="col col-md-12">{{index}}</label>
                  <div class="col col-lg-12">
                    <input
                      type="text"
                      class="form-control"
                      required
                      v-model="future_data[index]"
                      name="insert-future-symbol"
                    />
                </div>
            </div>
          </div>
          <div class = "form-group col text-center mt-4">
            <button id = "update" class="btn btn-success row-sm-4" type="button"
              @click="updateFuture">
              Update
            </button>
          </div>
          <nav class="navbar navbar-dark navbar-expand bg-primary mb-3">
                <span class="navbar-brand mb-0 h1">Delete </span>
          </nav>
            <div id = "delete" class="row justify-content-center">  
                <label class="col col-lg-2">future_symbol</label>
                  <div class="col col-lg-3">
                    <input
                      type="text"
                      class="form-control"
                      required
                      v-model="future_data.future_symbol"
                      name="delete-future-symbol"
                    />
                  </div>
            </div>
            <div class = "form-group col text-center mt-4">
                <button class="btn btn-success row-sm-4" type="button"
                  @click="deleteFuture">
                  Delete
                </button>
            </div>
          <div class="input-group mb-3 justify-content-center">
          <input type="text" class="form-control col-sm-8" placeholder="Execute by raw SQL"
            v-model="dml_sql"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="rawFutureDml()">
              Execute
            </button>
          </div>
          </div>
          <div>
          <label><strong>Ans:</strong></label>{{dml_ans}}
        </div>
          <nav class="navbar navbar-dark navbar-expand bg-primary mb-1">
              <span class="navbar-brand mb-0 h1">Future Data</span>
          </nav>
          <div class = "form-group col text-center mt-4">
            <button @click="countFuture" class="btn btn-success row-sm-4">COUNT</button>
            <button @click="avgFuturePrice" class="btn btn-success row-sm-4">AVG</button>
            <button @click="maxFuturePrice" class="btn btn-success row-sm-4">MAX</button>
            <button @click="minFuturePrice" class="btn btn-success row-sm-4">MIN</button>
          </div>
          <div class="input-group mb-3 justify-content-center">
          <input type="text" class="form-control col-sm-8" placeholder="Search by raw SQL"
            v-model="ddl_sql"/>
          <div class="input-group-append ">
            <button class="btn btn-outline-secondary" type="button"
              @click="rawFutureDdl()">
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
        <button class="btn btn-success" @click="newFuture">Return</button>
      </div>
    </div>
</template>

<script>
import findataservice from "../services/findataservice.js";

export default {
    name: "add-future",
    data(){
      return{
        entities:[],
        future_data:{
        future_symbol: "",
        open_price: "",
        close_price: "",
        high_price: "",
        low_price: "",
        volume:"",
        stock_symbol: ""
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
        findataservice.getallFuture()
            .then(response => {
              this.entities = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
        });
      },
      newFuture(){
        this.action_done = false;
        this.future_data = {
        future_symbol: "",
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
      updateFuture(){
        var data = {
            future_symbol: this.future_data.future_symbol,
            open_price: this.future_data.open_price,
            close_price: this.future_data.close_price,
            high_price: this.future_data.high_price,
            low_price: this.future_data.low_price,
            volume: this.future_data.volume
        };
        findataservice.updatefuture(data) 
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
      deleteFuture(){
        var data = {
            future_symbol: this.future_data.future_symbol,
        };
        findataservice.deletefuture(data) 
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
      countFuture(){
        findataservice.countfuture() 
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
      maxFuturePrice(){
        findataservice.maxfutureprice() 
        .then( response => {
          this.ddl_ans = 'Max close price SQL Ans: '+response.data['max']
          console.log(this.ddl_ans);
          this.action_done = true;
          response.end;
         
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      minFuturePrice(){
        findataservice.minfutureprice() 
        .then( response => {
          this.ddl_ans = 'Max close price SQL Ans: '+response.data['min']
          console.log(response.data);
          response.end;
          this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      avgFuturePrice(){
        findataservice.avgfutureprice()
        .then( response => {
          this.ddl_ans = 'Average close price SQL Ans: '+response.data[0]['avg']
          console.log(response.data);
          response.end;
          this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      //
      rawFutureDml(){
        var sql = {
          sql:this.dml_sql
        }
        findataservice.rawfuturedml(sql)
        .then(response => {
          if(response.data['res'][0].length != 0){
            this.dml_ans = 'future: '+response.data['res'][0][0]['future_symbol']+' does not publish option'
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
      //SELECT AVG(open_price) FROM futures
      rawFutureDdl(){
        var sql = {
          sql:this.ddl_sql
        }
        findataservice.rawfutureddl(sql)
        .then(response => {
          for (var key in response.data["res"][0][0]){
            console.log(key)
            this.ddl_ans = 'SQL Ans: '+ response.data["res"][0][0][key]
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