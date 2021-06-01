<template>
  <div id = "app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">fin_db</router-link>
    </nav>
  </div>
</template>

<script>
//import HomePage from './components/HomePage.vue'//Import

export default {
  name: 'App',
  components: {
    //註冊元件
    //HomePage
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
