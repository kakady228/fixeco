<template>
  <NavMenu />
  <router-view/>
  <Footer />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import NavMenu from '@/components/NavMenu.vue';
import Footer from '@/components/Footer.vue';

@Options({
  components: {
    NavMenu,
    Footer
  }
})


export default class App extends Vue{


}
</script>

<style>

html, body {
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
