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
          v-model="tutorial.stock_symbol"
          name="title"
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
import findataservice from "../services/findataservice";
export default {
    name: "home",
    data(){
      return{
        stock:{
        id: null,
        stock_symbol: ""
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
        .then(res =>{
            this.stock.id = res.data.id;
            console.log(res.data);
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
</style>