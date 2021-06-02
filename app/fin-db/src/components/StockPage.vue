<template>
    <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="stock-symbol">Stock Symbol</label>
        <input
          type="text"
          class="form-control"
          id="stock-symbol"
          required
          v-model="stock.stock_symbol"
          name="stock symbol"
        />
      </div>
      <button @click="saveStockSymbol" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <!-- button class="btn btn-success" @click="newTutorial">Add</button-->
    </div>
  </div>
</template>

<script>
import findataservice from "../services/findataservice.js";

export default {
    name: "add-stock",
    data(){
      return{
        stock:{
        id: null,
        stock_symbol: "",
        },
        submitted: false
      };// The data set that is going to pass to the server
    },
    methods: {
      saveStockSymbol(){
        var data = {
            stock_symbol: this.stock.stock_symbol
        };

        findataservice.create(data)
        .then(response => {
            this.stock.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
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
    max-width: 300px;
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