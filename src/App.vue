<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
  // import store from './store/index';
export default {
  name: 'App'
}
</script>

<style>
  @import './styles/index.scss';
</style>
<style>
  html, body{
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
  }
  .app{
    height: 100%;
  }
</style>
