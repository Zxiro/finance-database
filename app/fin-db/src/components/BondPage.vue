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
          name="title"
        />
      </div>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <!-- button class="btn btn-success" @click="newTutorial">Add</button-->
    </div>
  </div>
</template>

<script>
//import findataservice from "../services/findataservice";
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
  }
};

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>