<template>
  <div id = "app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">fin_db</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/stocks" class="nav-link">stocks</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/bonds" class="nav-link">bonds</router-link>
        </li>
      </div>
    </nav>
    <div class="container-fluid mt-5">
      <router-view /> <!-- Decide which component show in this part -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-background-clip: padding-box;
  -moz-osx-font-smoothing: grayscale;;
  color: #2c3e50;
  height: 100vh;
}
.container-fluid {
  height: 100%;
  background: #f0e68c;
}
</style>
