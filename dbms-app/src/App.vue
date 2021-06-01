<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div id = "app">
    <h1> DBMS Project </h1>
    <home-page></home-page>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'//Import

export default {
  name: 'App',
  components: {
    //註冊元件
    HomePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
