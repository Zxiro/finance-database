<template>
    <div class="submit-form">
      <div v-if="!action_done">
          <div class="form-group row">
            <label for="enterprise-symbol" class="col-md-5 col-form-label">Enterprise Symbol</label>
              <div class="col-md-7">
                <input
                  type="text"
                  class="form-control"
                  id="enterprise-symbol"
                  required
                  v-model="enterprise_data.enterprise_symbol"
                  name="enterprise-symbol"
                />
            </div>
          </div>
          <div class = "form-group col text-center mt-4">
            <button @click="saveEnterprise" class="btn btn-success row-sm-4">Submit</button><!-- create and save new stock table-->
            <!--== button @click="updateStock" class="btn btn-success row-sm-4">Edit</button>
            <button @click="deleteStock" class="btn btn-success row-sm-4">Delete</button>
            <button @click="countStock" class="btn btn-success row-sm-4">COUNT</button--> 
          </div>
      </div>
      <div v-else>
        <h4>Operation finished!</h4>
        <button class="btn btn-success" @click="newEnterprise">Return</button>
      </div>
    </div>
</template>

<script>
import findataservice from "../services/findataservice.js";

export default {
    name: "add-enterprise",
    data(){
      return{
        enterprise_data:{
        id: null,
        enterprise_symbol: "",
        },
        action_done: false
      };// The data set that is going to pass to the server
    },
    methods: {
      saveEnterprise(){
        var data = {
            enterprise_symbol: this.enterprise_data.enterprise_symbol,
        };
        findataservice.createEnterprise(data) //promise if successfully create, it will execute .then
          .then(response => {
              this.enterprise_data.id = response.data.id;
              console.log(response.data);
              this.action_done = true;
              response.end;
          })
          .catch(e => {
              console.log(e);
          });
      },
      newEnterprise(){
        this.action_done = false;
        this.enterprise_data = {};
      },
      /*updateStock(){
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
        var data = {
            stock_symbol: this.stock_data.stock_symbol,
        };
        findataservice.countstock(data) 
        .then( response => {
            console.log(response.data);
            response.end;
            this.action_done = true;
        }
        )
        .catch(e => {
              console.log(e);
          });
      }*/
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