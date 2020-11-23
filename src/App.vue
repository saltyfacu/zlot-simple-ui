<template lang="pug">
  div(v-if="isDrizzleInitialized", id="app")
    // .logo 💤🌖🎱
    .logo
      img(src="zl.png")
    div(class="nav")
      router-link(to="/stake") Stake
      router-link(to="/zgovernance") ZGovernance
    .section
      <router-view></router-view>
    p.separator
      div.muted
        span Made with 💙  
        span Contracts:  
        a(href='https://zlot.finance/', target='_blank') zLot Finance
        span  - UI:  
        a(href='https://twitter.com/fameal', target='_blank') fameal
  div(v-else)
    div Loading 💤🌖🎱...
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {},

  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;700&display=swap');

#app {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  //color: #2c3e50;
  color: #363636;
  margin-top: 2em;
}

a, a:visited, a:hover {
  color: gray;
}

.column {
  float: left;
  width: 40%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.logo {
  font-size: 80px;
  margin-bottom: 20px;
}

.logo img {
  height: 150px;
}

.nav a, .nav a:visited, .nav a:hover {
  margin-right: 1em;
  padding-left: 0.3em;
  padding-right: 0.3em;
}

.router-link-active {
  background-color: black;
  color: white !important;
}

.nav a::before {
  content: "[";
  text-decoration: none;
}

.nav a::after {
  content: "]";
  text-decoration: none;
}

span.unit {
  color: #333;
  font-size: 11px;
  display: inline !important;
}

span.label {
  color: #444;
  margin-right: 0.5em;
  display: inline !important;
}
</style>
