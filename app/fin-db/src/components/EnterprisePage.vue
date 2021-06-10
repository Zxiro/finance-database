<template>
    <div class="submit-form">
      <div v-if="!action_done">
        <div class="container-fluid">
          <nav class="navbar navbar-dark navbar-expand bg-dark mt-2">
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
          <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by raw SQL"
            v-model="dml_sql"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="rawEnterpriseDml()">
              Search
            </button>
          </div>
          </div>
          <nav class="navbar navbar-dark navbar-expand bg-dark">
                <span class="navbar-brand mb-0 h1">Delete Enterprise</span>
          </nav>
            <div id = "delete" class="row justify-content-start">  
                <label class="col col-lg-1">enterprise_symbol</label>
                  <div class="col col-lg-12">
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
            </div>
          <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by raw SQL"
            v-model="dml_sql"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="rawEnterpriseDml()">
              Search
            </button>
          </div>
          </div>
          <nav class="navbar navbar-dark navbar-expand bg-dark">
              <span class="navbar-brand mb-0 h1">Enterprise Data</span>
          </nav>
          <div class = "form-group col text-center mt-4">
            <button @click="countEnterprise" class="btn btn-success row-sm-4">COUNT</button>
          </div>
          <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by raw SQL"
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
        enterprise_data:{
        enterprise_symbol: "",
        },
        dml_sql:"",
        ddl_sql:"",
        ddl_ans:"",
        action_done: false
      };// The data set that is going to pass to the server
    },
    methods: {
      newEnterprise(){
        this.action_done = false;
        this.enterprise_data = {
        enterprise_symbol: "",
        };
        this.dml_sql="",
        this.ddl_sql="";
      },
      insertEnterprise(){
        var data = {
            enterprise_symbol: this.enterprise_data.enterprise_symbol,
        };
        findataservice.insertenterprise(data) 
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
      updateEnterprise(){
        var data = {
            enterprise_symbol: this.enterprise_data.enterprise_symbol,
            open_price: this.enterprise_data.open_price,
            close_price: this.enterprise_data.close_price
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
          this.ddl_ans = response.data;
          console.log(response.data);
          response.end;
          this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      rawEnterpriseDml(){
        var sql = {
          sql:this.dml_sql
        }
        findataservice.rawenterprisedml(sql)
        .then(response => {
          //this.entities = response.data["res"][0][0];
          console.log(response);
          response.end;
          this.action_done = true;
        })
        .catch(e => {
          console.log(e);
        });
      },
      rawEnterpriseDdl(){
        var sql = {
          sql:this.ddl_sql
        }
        findataservice.rawenterpriseddl(sql)
        .then(response => {
          this.ddl_ans = response.data["res"][0][0];
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
      }
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