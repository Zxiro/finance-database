<template>
    <div class="submit-form">
      <div v-if="!action_done">
          <div class="form-group row">
            <label for="option-symbol" class="col-sm-4 col-form-label">Option Symbol</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="option-symbol"
                  required
                  v-model="option_data.option_symbol"
                  name="option-symbol"
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
                  v-model="option_data.open_price"
                  name="open-price"
                />
            </div>
          </div>
          <div class="form-group row">
            <label for="option-symbol" class="col-sm-4 col-form-label">Close Price</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="close-price"
                  required
                  v-model="option_data.close_price"
                  name="close-price"
                />
            </div>
          </div>
          <div class = "form-group col text-center mt-4">
            <button @click="insertOption" class="btn btn-success row-sm-4">Insert</button>
            <button @click="updateOption" class="btn btn-success row-sm-4">Edit</button>
            <button @click="deleteOption" class="btn btn-success row-sm-4">Delete</button>
            <button @click="countOption" class="btn btn-success row-sm-4">COUNT</button>
            <button @click="maxOptionPrice" class="btn btn-success row-sm-4">MAX</button>
            <button @click="minOptionPrice" class="btn btn-success row-sm-4">MIN</button>
            <button @click="avgOptionPrice" class="btn btn-success row-sm-4">AVG</button> 
          </div>
      </div>
      <div v-else>
        <h4>Operation finished!</h4>
        <button class="btn btn-success" @click="newOption">Return</button>
      </div>
    </div>
</template>

<script>
import findataservice from "../services/findataservice.js";

export default {
    name: "add-option",
    data(){
      return{
        option_data:{
        id: null,
        option_symbol: "",
        open_price: "",
        close_price: "",
        },
        action_done: false
      };// The data set that is going to pass to the server
    },
    methods: {
      newOption(){
        this.action_done = false;
        this.option_data = {};
      },
      insertOption(){
        var data = {
            option_symbol: this.option_data.option_symbol,
            open_price: this.option_data.open_price,
            close_price: this.option_data.close_price
        };
        findataservice.insertoption(data) 
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
      updateOption(){
        var data = {
            option_symbol: this.option_data.option_symbol,
            open_price: this.option_data.open_price,
            close_price: this.option_data.close_price
        };
        findataservice.updateoption(data) 
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
      deleteOption(){
        var data = {
            option_symbol: this.option_data.option_symbol,
        };
        findataservice.deleteoption(data) 
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
      countOption(){
        var data = {
            option_symbol: this.option_data.option_symbol,
        };
        findataservice.countoption(data) 
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
      maxOptionPrice(){
        /*var data = {
            Option_symbol: this.Option_data.Option_symbol,
        };*/
        findataservice.maxoptionprice() 
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
      minOptionPrice(){
        /*var data = {
            Option_symbol: this.Option_data.Option_symbol,
        };*/
        findataservice.minoptionprice() 
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
      avgOptionPrice(){
        /*var data = {
            Option_symbol: this.Option_data.Option_symbol,
        };*/
        findataservice.avgoptionprice() 
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