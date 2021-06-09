<template>
<div class="list row">
  <div id="type_selector" class="form-group col-md-12">
    <label for="type">Select list:</label>
    <select class="form-control" v-model="type">
      <option>stock</option>
      <option>bond</option>
      <option>enterprise</option>
      <option>option</option>
      <option>future</option>
    </select>
  </div>

  <div v-if="type">
  <!--div v-if="type" class="container-fluid mt-5">
    <router-view></router-view-->
    <div class="col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by symbol"
          v-model="primaryKey"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="onclickPKsearch()">
            Search
          </button>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label">Search Multiple</label>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="onclickInsearch()">
            Search
          </button>
        </div>
      <div id = "in_group" class="form-group row row-m-1">
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              required
              v-model="in_condtion[0]"
            />
          </div>
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              id="close-price"
              required
              v-model="in_condtion[1]"
              name="close-price"
            />
          </div>
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              id="close-price"
              required
              v-model="in_condtion[2]"
              name="close-price"
            />
          </div>
      </div>
       <label class="col-sm-4 col-form-label">Search Multiple Not IN</label>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="onclickNotInsearch()">
            Search
          </button>
        </div>
      <div id = "in_group" class="form-group row row-m-1">
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              required
              v-model="not_in_condtion[0]"
            />
          </div>
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              id="close-price"
              required
              v-model="not_in_condtion[1]"
              name="close-price"
            />
          </div>
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              id="close-price"
              required
              v-model="not_in_condtion[2]"
              name="close-price"
            />
          </div>
      </div>
      </div>
       <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by raw SQL"
          v-model="sql"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="raw_retrieveStocks()">
            Search
          </button>
        </div>
        
       </div>
    </div>
  </div>
      <!-- router-link :to="stocks/" class="badge badge-warning">Edit</router-link-->
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
</template>

<script>

import findataservice from "../services/findataservice";

export default {
  name: "list",
  data() {
    return {
      type: "",
      entities: [],
      in_condtion: [],
      not_in_condtion: [],
      primaryKey: "",
      sql: "",
      currentIndex: -1,
      currentProduct: null
    };
  },
  watch: {
    type: {
      handler(value){
      if(value == 'stock'){
        this.retrieveAllStockData();
      }
      if(value == 'bond'){
        this.retrieveAllBondData();
      }
      if(value == 'enterprise'){
        this.retrieveAllEnterpriseData();
      }
      if(value == 'option'){
        this.retrieveAllOptionData();
      }
      if(value == 'future'){
        this.retrieveAllFutureData();
      }
      }
    }
  },
  methods: {
    retrieveAllStockData() {
      findataservice.getallStock()
        .then(response => {
          this.entities = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveAllBondData() {
      var type = this.type;
      console.log(type);
      findataservice.getall(type)
        .then(response => {
          this.entities = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveAllEnterpriseData() {
      var type = this.type;
      console.log(type);
      findataservice.getall(type)
        .then(response => {
          this.entities = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveAllOptionData() {
      var type = this.type;
      console.log(type);
      findataservice.getall(type)
        .then(response => {
          this.entities = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveAllFutureData() {
      var type = this.type;
      console.log(type);
      findataservice.getall(type)
        .then(response => {
          this.entities = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    onclickPKsearch(){
      var value = this.type;
      if(value == 'stock'){
        this.retrieveStocks();
      }
      /*if(value == 'bond'){
        this.retrieveAllBondData();
      }
      if(value == 'enterprise'){
        this.retrieveAllEnterpriseData();
      }
      if(value == 'option'){
        this.retrieveAllOptionData();
      }
      if(value == 'future'){
        this.retrieveAllFutureData();
      }*/
    },
    onclickInsearch(){
      var value = this.type;
      if(value == 'stock'){
        this.retrieveInStocks();
      }
      /*if(value == 'bond'){
        this.retrieveAllBondData();
      }
      if(value == 'enterprise'){
        this.retrieveAllEnterpriseData();
      }
      if(value == 'option'){
        this.retrieveAllOptionData();
      }
      if(value == 'future'){
        this.retrieveAllFutureData();
      }*/
    },
    onclickNotInsearch(){
      var value = this.type;
      if(value == 'stock'){
        this.retrieveNotInStocks();
      }
      /*if(value == 'bond'){
        this.retrieveAllBondData();
      }
      if(value == 'enterprise'){
        this.retrieveAllEnterpriseData();
      }
      if(value == 'option'){
        this.retrieveAllOptionData();
      }
      if(value == 'future'){
        this.retrieveAllFutureData();
      }*/
    },
    retrieveStocks() {
      var stock_symbol = this.primaryKey;
      findataservice.getbysymbol(stock_symbol)
        .then(response => {
          this.entities = response.data;
          console.log(this.entities);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveInStocks() {
      findataservice.getbyInsymbol(this.in_condtion)
        .then(response => {
          this.entities = response.data;
          console.log(this.entities);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveNotInStocks() {
      findataservice.getbyNotInsymbol(this.not_in_condtion)
        .then(response => {
          this.entities = response.data;
          console.log(this.entities);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveEnterprise() {
      var enterprise_symbol = this.stock_symbol;
      findataservice.enter_getbysymbol(enterprise_symbol)
        .then(response => {
          this.entities = response.data[0];
          console.log(this.entities);
        })
        .catch(e => {
          console.log(e);
        });
    },
    raw_retrieveStocks() {
      var sql = {
        "sql":this.sql
      };
      findataservice.raw_getbysymbol(sql)
        .then(response => {
          this.entities = response.data["res"][0][0];
          console.log(this.entities);
        })
        .catch(e => {
          console.log(e);
        });
    },
  }
}
/*
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
};*/
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
#type_selector{
  max-width: 100%;
  margin: auto;
  margin-bottom: 20px;
}
.container-fluid {
  height: 50%;
}
#in_group{
  margin: auto;
}
</style>