<template>
    <div class="submit-form">
      <div v-if="!action_done">
        <div id = 'enter' class="container-fluid p-0">
          <nav class="navbar navbar-dark navbar-expand bg-primary ">
            <span class="navbar-brand mb-0 h1">Insert & Update Enterprise</span>
          </nav>
            <div id = "insert" class="row justify-content-center">
              <div v-for="(feature, index) in enterprise_data"
                :key = "index">  
                <label class="col col-lg-4">{{index}}</label>
                  <div class="col col-lg-12">
                    <input
                      type="text"
                      class="form-control"
                      required
                      v-model="enterprise_data[index]"
                      name="insert-enterprise-symbol"
                    />
                </div>
            </div>
          </div>
          <div class = "form-group col text-center mt-4">
            <button class="btn btn-success row-sm-4" type="button"
                @click="insertEnterprise">
                Insert
              </button>
            <button class="btn btn-success row-sm-4" type="button"
              @click="updateEnterprise">
              Update
            </button>
          </div>
          <nav class="navbar navbar-dark navbar-expand bg-primary">
                <span class="navbar-brand mb-0 h1">Delete Enterprise</span>
          </nav>
            <div id = "delete" class="row justify-content-center mt-4">  
                <label class="col col-lg-2">enterprise_symbol</label>
                  <div class="col col-lg-3">
                    <input
                      type="text"
                      class="form-control"
                      required
                      v-model="enterprise_data.enterprise_symbol"
                      name="delete-enterprise-symbol"
                    />
                  </div>
            </div>
            <div class = "form-group col text-center mt-4">
                <button class="btn btn-success row-sm-4" type="button"
                  @click="deleteEnterprise">
                  Delete
                </button>
                <button @click="existEnterpriseBond" class="btn btn-success row-sm-4">EXIST bond</button>
            </div>
          <div class="input-group mb-3 justify-content-center">
          <input type="text" class="form-control col-sm-8" placeholder="Search by raw SQL"
            v-model="dml_sql"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="rawEnterpriseDml()">
              Search
            </button>
          </div>
          </div>
          <div>
          <label><strong>Ans:</strong></label>{{dml_ans}}
        </div>
          <nav class="navbar navbar-dark navbar-expand bg-primary">
              <span class="navbar-brand mb-0 h1">Enterprise Data</span>
          </nav>
          <div class = "form-group col text-center mt-4">
            <button @click="countEnterprise" class="btn btn-success row-sm-4">COUNT</button>
            <button @click="havingMaxOpCashEnterprise" class="btn btn-success row-sm-4">HAVING Min Op cash</button>
          </div>
          <div class="input-group mb-3 justify-content-center">
          <input type="text" class="form-control " placeholder="Search by raw SQL"
            v-model="ddl_sql"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="rawEnterpriseDdl()">
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
        <button class="btn btn-success" @click="newEnterprise">Return</button>
      </div>
    </div>
</template>

<script>
import findataservice from "../services/findataservice.js";

export default {
    name: "add-enterprise",
    data(){
      return{
        entities:[],
        enterprise_data:{
        enterprise_symbol: "",
        operation_cash:"",
        investing_cash:"",
        financing_cash:""
        },
        dml_sql:"",
        ddl_sql:"",
        ddl_ans:"",
        dml_ans:"",
        action_done: false
      };// The data set that is going to pass to the server
    },
    methods: {
      getalldata(){
        findataservice.getallEnterprise()
            .then(response => {
              this.entities = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
        });
      },
      newEnterprise(){
        this.action_done = false;
        this.enterprise_data = {
        enterprise_symbol: "",
        operation_cash:"",
        investing_cash:"",
        financing_cash:""
        };
        this.dml_sql="",
        this.ddl_sql="",
        this.getalldata();
      },
      insertEnterprise(){
        var data = {
            enterprise_symbol: this.enterprise_data.enterprise_symbol,
            operation_cash:this.enterprise_data.operation_cash,
            investing_cash:this.enterprise_data.investing_cash,
            financing_cash:this.enterprise_data.financing_cash,
        };
        findataservice.insertenterprise(data) 
        .then( response => {
            console.log(response.data);
            this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      updateEnterprise(){
        var data = {
            enterprise_symbol: this.enterprise_data.enterprise_symbol,
            operation_cash:this.enterprise_data.operation_cash,
            investing_cash:this.enterprise_data.investing_cash,
            financing_cash:this.enterprise_data.financing_cash,
        };
        findataservice.updateenterprise(data) 
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
      deleteEnterprise(){
        var data = {
            enterprise_symbol: this.enterprise_data.enterprise_symbol,
        };
        findataservice.deleteenterprise(data) 
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
      countEnterprise(){
        findataservice.countenterprise() 
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
      havingMaxOpCashEnterprise(){
        findataservice.havingmaxopcashenterprise() 
        .then( response => {
          this.entities = response.data[0];
          console.log(this.entities);
          response.end;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      existEnterpriseBond(){
        var enterprise_symbol = this.enterprise_data.enterprise_symbol
        findataservice.existenterprisebond(enterprise_symbol) 
        .then( response => {
          var tmp = response.data['res'][0]
          if(Object.keys(tmp).length == 1){ //Does not exist
            this.dml_ans = 'enterprise: '+enterprise_symbol+' does publish bond'
            response.end;
            this.action_done = true;
          }
          else{
            this.dml_ans = 'enterprise: '+enterprise_symbol+' does not publish bond'
            response.end;
            this.action_done = true;
          }
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
    // INSERT INTO enterprises(enterprise_symbol, operation_cash, investing_cash, financing_cash) VALUES(22222222, 99, 99, 99)
      rawEnterpriseDml(){
        var sql = {
          sql:this.dml_sql
        }
        findataservice.rawenterprisedml(sql)
        .then(response => {
          console.log(response)
          console.log(response.data[0])
          if(response.data[0].length == 0){
            response.end;
            this.action_done = true;
          } else if(response.data[0].length != 0){
            this.dml_ans = 'enterprise: '+response.data[0][0]['enterprise_symbol']+' does publish bond'
            response.end
            this.action_done = true;
          }
          console.log(response);
          response.end;
          this.action_done = true;
        })
        .catch(e => {
          console.log(e);
        });
      },
      //SELECT MAX(operation_cash) FROM enterprises HAVING MAX(operation_cash)>400
      rawEnterpriseDdl(){
        var sql = {
          sql:this.ddl_sql
        }
        findataservice.rawenterpriseddl(sql)
        .then(response => {
          this.entities = response.data['res'][0];
          console.log(this.entities);
          response.end;
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
    min-width:100%;
  }
  .container-fluid{
    background:whitesmoke;
    width:100%;
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