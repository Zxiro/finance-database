<template>
    <div class="submit-form">
      <div v-if="!action_done">
        <div class="container-fluid">
          <nav class="navbar navbar-dark navbar-expand bg-dark mt-2">
            <span class="navbar-brand mb-0 h1">Insert & Update Stock</span>
          </nav>
            <div id = "insert" class="row justify-content-center">
              <div v-for="(feature, index) in stock_data"
                :key = "index">  
                <label class="col col-lg-4">{{index}}</label>
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
            <button class="btn btn-success row-sm-4" type="button"
                @click="insertStock">
                Insert
              </button>
            <button class="btn btn-success row-sm-4" type="button"
              @click="updateStock">
              Update
            </button>
          </div>
          <nav class="navbar navbar-dark navbar-expand bg-dark">
                <span class="navbar-brand mb-0 h1">Delete Stock</span>
          </nav>
            <div id = "delete" class="row justify-content-start">  
                <label class="col col-lg-1">stock_symbol</label>
                  <div class="col col-lg-12">
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
            </div>
          <nav class="navbar navbar-dark navbar-expand bg-dark">
              <span class="navbar-brand mb-0 h1">Stock Data</span>
          </nav>
          <div class = "form-group col text-center mt-4">
            <button @click="countStock" class="btn btn-success row-sm-4">COUNT</button>
            <button @click="maxStockPrice" class="btn btn-success row-sm-4">MAX</button>
            <button @click="minStockPrice" class="btn btn-success row-sm-4">MIN</button>
          </div>
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
        stock_data:{
        stock_symbol: "",
        open_price: "",
        close_price: "",
        enterprise_symbol: ""
        },
        attr_list:[
          "stock symbol", 
          "open price",
          "close price",
          "enterprise symbol"
        ],
        max_price:"",
        min_price:"",
        stock_count:"",
        action_done: false
      };// The data set that is going to pass to the server
    },
    methods: {
      newStock(){
        this.action_done = false;
        this.stock_data = {
        stock_symbol: "",
        open_price: "",
        close_price: "",
        enterprise_symbol: ""
        };
      },
      insertStock(){
        var data = {
            stock_symbol: this.stock_data.stock_symbol,
            open_price: this.stock_data.open_price,
            close_price: this.stock_data.close_price,
            enterprise_symbol: this.stock_data.enterprise_symbol
        };
        findataservice.insertstock(data) 
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
      updateStock(){
        var data = {
            stock_symbol: this.stock_data.stock_symbol,
            open_price: this.stock_data.open_price,
            close_price: this.stock_data.close_price
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
            console.log(response.data);
            response.end;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      maxStockPrice(){
        findataservice.maxstockprice() 
        .then( response => {
            console.log(response.data);
            response.end;
        }
        )
        .catch(e => {
              console.log(e);
          });
      },
      minStockPrice(){
        /*var data = {
            stock_symbol: this.stock_data.stock_symbol,
        };*/
        findataservice.minstockprice() 
        .then( response => {
            console.log(response.data);
            response.end;
        }
        )
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
  .form-control{
    -webkit-background-clip: padding-box;
    mt:5px;
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
  .col-sm-8{
    mt:5px;
  }
</style>