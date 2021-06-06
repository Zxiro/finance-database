<template>
    <div class="submit-form">
      <div v-if="!action_done">
          <div class="form-group row">
            <label for="stock-symbol" class="col-sm-4 col-form-label">Stock Symbol</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="stock-symbol"
                  required
                  v-model="stock_data.stock_symbol"
                  name="stock-symbol"
                />
            </div>
          </div>
          <div class="form-group row">
            <label for="open-price" class="col-sm-4 col-form-label">Open Price</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="open-price"
                  required
                  v-model="stock_data.open_price"
                  name="open-price"
                />
            </div>
          </div>
          <div class="form-group row">
            <label for="stock-symbol" class="col-sm-4 col-form-label">Close Price</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="close-price"
                  required
                  v-model="stock_data.close_price"
                  name="close-price"
                />
            </div>
          </div>
          <div class = "form-group col text-center mt-4">
            <button @click="saveStock" class="btn btn-success row-sm-4">Submit</button>
            <button @click="updateStock" class="btn btn-success row-sm-4">Edit</button>
            <button @click="saveStock" class="btn btn-success row-sm-4">Delete</button> <!-- create and save new stock table-->
          </div>
      </div>
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newStock">Add</button>
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
        id: null,
        stock_symbol: "",
        open_price: "",
        close_price: ""
        },
        action_done: false
      };// The data set that is going to pass to the server
    },
    methods: {
      saveStock(){
        var data = {
            stock_symbol: this.stock_data.stock_symbol,
            open_price: this.stock_data.open_price,
            close_price: this.stock_data.close_price
        };
        findataservice.create(data) //promise if successfully create, it will execute .then
          .then(response => {
              this.stock_data.id = response.data.id;
              console.log(response.data);
              this.action_done = true;
              response.end;
          })
          .catch(e => {
              console.log(e);
          });
      },
      newStock(){
        this.action_done = false;
        this.stock_data = {};
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
      }
    }
};

</script>

<style>
  .submit-form {
    max-width:350px;
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