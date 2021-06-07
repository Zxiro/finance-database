<template>
<div class="list row">
  <div id="type_selector" class="form-group col-ml-8">
    <label for="type">Select list:</label>
    <select class="form-control" v-model="type">
      <option>stock</option>
      <option>bond</option>
      <option>enterprise</option>
      <option>option</option>
      <option>future</option>
    </select>
  </div>
  <div v-if="type" class="container-fluid mt-5">
    <router-view></router-view>
  </div>
    <div class="col-md-6">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by symbol"
          v-model="stock_symbol"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="retrieveEnterprise()">
            Search
          </button>
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
    
    <div class="col-md-6">
      <h4>Stock</h4>
      <div>
        <label><strong>stock_symbol:</strong></label> {{ entities.stock_symbol }}
      </div>
      <div>
        <label><strong>open_price:</strong></label> {{ entities.open_price }}
      </div>
      <div>
        <label><strong>close_price:</strong></label> {{ entities.close_price }}
      </div>
      <!-- router-link :to="stocks/" class="badge badge-warning">Edit</router-link-->
    </div>

    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(product, index) in entities"
          :key="index"
          @click="setActiveTutorial(product, index)"
        >
          {{ product.stock_symbol }}
        </li>
      </ul>

      <!-- button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button-->
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
      stock_symbol: "",
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
    retrieveStocks() {
      var stock_symbol = this.stock_symbol;
      findataservice.getbysymbol(stock_symbol)
        .then(response => {
          this.entities = response.data[0];
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
</style>