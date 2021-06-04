<template>
  <div id="type_selector" class="form-group">
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
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by symbol"
          v-model="stock_symbol"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="retrieveStocks(stock_symbol)">
            Search
          </button>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h4>Stock</h4>
      <div>
        <label><strong>Title:</strong></label> {{ stock.stock_symbol }}
      </div>
      <div>
        <label><strong>open_price:</strong></label> {{ stock.open_price }}
      </div>
      <div>
        <label><strong>close_price:</strong></label> {{ stock.close_price }}
      </div>
      <!--router-link :to="'/stocks/' + stock.stock_symbol" class="badge badge-warning">Edit</router-link-->
    </div>

    <!-- div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    
    </div-->
  </div>
</template>

<script>
import findataservice from "../services/findataservice";

export default {
  name: "list",
  data() {
    return {
      type: "",
      stock: [],
      stock_symbol: ""
    };
  },
  methods: {
    retrieveStocks(stock_symbol) {
      findataservice.getbysymbol(stock_symbol)
        .then(response => {
          this.stock = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
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
  mounted() {
    this.retrieveTutorials();
  }
};*/
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
#type_selector{
  margin-bottom: 20px;
  max-width: 80%;
  margin-left: 140px;
}
.container-fluid {
  height: 50%;
  
}
</style>