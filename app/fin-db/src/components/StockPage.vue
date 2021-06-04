<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <form>
          <div class="form-group row">
            <label for="stock-symbol" class="col-sm-4 col-form-label">Stock Symbol</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="stock-symbol"
                  required
                  v-model="stock_data.stock_symbol"
                  name="stock symbol"
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
                  name="close price"
                />
            </div>
          </div>
          <button @click="saveStock" class="btn btn-success">Submit</button> <!-- create and save new stock table-->
        </form> 
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
        submitted: false
      };// The data set that is going to pass to the server
    },
    methods: {
      saveStock(){
        var data = {
            stock_symbol: this.stock_data.stock_symbol,
            open_price: this.stock_data.open_price,
            close_price: this.stock_data.close_price
        };
        findataservice.create(data)
        .then(response => {
            this.stock_data.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
        })
        .catch(e => {
            console.log(e);
        });
      },
      newStock(){
        this.submitted = false;
        this.stock_data = {};
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
  }
  .form-check-input {
    -webkit-print-color-adjust: exact;
  }
  .sticky-top {
      position: sticky;
  }
  body {
      text-size-adjust: 100%;
  }
  th {
      text-align: match-parent;
  }
</style>