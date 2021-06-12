<template>
    <div class="submit-form">
      <div v-if="!action_done">
        <div class="container-fluid p-0">
          <nav class="navbar navbar-dark navbar-expand bg-primary mb-3">
            <span class="navbar-brand mb-0 h1">Update</span>
          </nav>
            <div id = "insert" class="row justify-content-center">
              <div v-for="(feature, index) in bond_data"
                :key = "index" class = "col col-lg">  
                <label class="col col-md-12">{{index}}</label>
                  <div class="col col-lg-12">
                    <input
                      type="text"
                      class="form-control"
                      required
                      v-model="bond_data[index]"
                      name="insert-bond-symbol"
                    />
                </div>
            </div>
          </div>
          <div class = "form-group col text-center mt-4">
            <button id = "update" class="btn btn-success row-sm-4" type="button"
              @click="updateBond">
              Update
            </button>
          </div>
          <nav class="navbar navbar-dark navbar-expand bg-primary mb-3">
                <span class="navbar-brand mb-0 h1">Delete </span>
          </nav>
            <div id = "delete" class="row justify-content-center">  
                <label class="col col-lg-2">bond_symbol</label>
                  <div class="col col-lg-3">
                    <input
                      type="text"
                      class="form-control"
                      required
                      v-model="bond_data.bond_symbol"
                      name="delete-bond-symbol"
                    />
                  </div>
            </div>
            <div class = "form-group col text-center mt-4">
                <button class="btn btn-success row-sm-4" type="button"
                  @click="deleteBond">
                  Delete
                </button>
            </div>
          <div class="input-group mb-3 justify-content-center">
          <input type="text" class="form-control col-sm-8" placeholder="Execute by raw SQL"
            v-model="dml_sql"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="rawBondDml()">
              Execute
            </button>
          </div>
          </div>
          <div>
          <label><strong>Ans:</strong></label>{{dml_ans}}
        </div>
          <nav class="navbar navbar-dark navbar-expand bg-primary mb-1">
              <span class="navbar-brand mb-0 h1">Bond Data</span>
          </nav>
          <div class = "form-group col text-center mt-4">
            <button @click="countBond" class="btn btn-success row-sm-4">COUNT</button>
            <button @click="avgBondPrice" class="btn btn-success row-sm-4">AVG</button>
            <button @click="maxBondPrice" class="btn btn-success row-sm-4">MAX</button>
            <button @click="minBondPrice" class="btn btn-success row-sm-4">MIN</button>
          </div>
          <div class="input-group mb-3 justify-content-center">
          <input type="text" class="form-control col-sm-8" placeholder="Search by raw SQL"
            v-model="ddl_sql"/>
          <div class="input-group-append ">
            <button class="btn btn-outline-secondary" type="button"
              @click="rawBondDdl()">
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
        <button class="btn btn-success" @click="newBond">Return</button>
      </div>
    </div>
</template>

<script>
import findataservice from "../services/findataservice.js";

export default {
    name: "add-bond",
    data(){
      return{
        entities:[],
        bond_data:{
        bond_symbol: "",
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
        findataservice.getallBond()
            .then(response => {
              this.entities = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
        });
      },
      newBond(){
        this.action_done = false;
        this.bond_data = {
        bond_symbol: "",
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
      updateBond(){
        var data = {
            bond_symbol: this.bond_data.bond_symbol,
            open_price: this.bond_data.open_price,
            close_price: this.bond_data.close_price,
            high_price: this.bond_data.high_price,
            low_price: this.bond_data.low_price,
            volume: this.bond_data.volume
        };
        findataservice.updatebond(data) 
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
      deleteBond(){
        var data = {
            bond_symbol: this.bond_data.bond_symbol,
        };
        findataservice.deletebond(data) 
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
      countBond(){
        findataservice.countbond() 
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
      maxBondPrice(){
        findataservice.maxbondprice() 
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
      minBondPrice(){
        findataservice.minbondprice() 
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
      avgBondPrice(){
        findataservice.avgbondprice()
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
      rawBondDml(){
        var sql = {
          sql:this.dml_sql
        }
        findataservice.rawbonddml(sql)
        .then(response => {
          if(response.data['res'][0].length != 0){
            this.dml_ans = 'bond: '+response.data['res'][0][0]['bond_symbol']+' does not publish option'
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
      //SELECT AVG(open_price) FROM bonds
      rawBondDdl(){
        var sql = {
          sql:this.ddl_sql
        }
        findataservice.rawbondddl(sql)
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