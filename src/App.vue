<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: rgb(167, 207, 178);
  padding: 0;
  margin: 0;
}
@media screen and (max-width: 500px) {
  body {
    background-color: #fff;
  }
}
</style>
