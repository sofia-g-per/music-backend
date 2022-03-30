<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <side-bar></side-bar>
  <list-item></list-item>
</template>

<script>
import ListItem from './components/ListItem.vue';
import SideBar from './components/SideBar.vue';

export default {
  name: 'App',
  components: {
    ListItem,
    SideBar
  }
}
</script>

<style>
:root{
  --main-bg-color: #fff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapped-image{
  max-width: 100%;
}
</style>
