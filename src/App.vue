<template lang="pug">
  div(v-if="isDrizzleInitialized", id="app")
    .logo 💤🌖🎱
    div(class="nav")
      router-link(to="/stake") Stake
      router-link(to="/pools") Pools
      router-link(to="/zgovernance") ZGovernance
    .section
      <router-view></router-view>
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
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&display=swap');

#app {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

a, a:visited, a:hover {
  color: gray;
}

.column {
  float: left;
  width: 30%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.logo {
  font-size: 100px;
}

.nav a, .nav a:visited, .nav a:hover {
  margin-right: 1em;
  padding-left: 0.3em;
  padding-right: 0.3em;
}

.router-link-active {
  background-color: gray;
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
</style>
