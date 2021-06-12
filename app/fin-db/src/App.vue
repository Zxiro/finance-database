<template>
  <div id = "app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">fin_db</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/stocks" class="nav-link">stocks</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/enterprises" class="nav-link">enterprises</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/bonds" class="nav-link">bonds</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/options" class="nav-link">options</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/futures" class="nav-link">futures</router-link>
        </li>
      </div>
    </nav>
    <div class="container-fluid p-0">
      <router-view /> <!-- Decide which component show in this part -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-background-clip: padding-box;
  -moz-osx-font-smoothing: grayscale;;
  color: #2c3e50;
  background: whitesmoke;
  height: 100%;
}
.container-fluid {
  height: 100%;
  width:100%;
  background: whitesmoke;
  padding:0px;
}
</style>
