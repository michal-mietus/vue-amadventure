<template>
  <div id="app">
    <Navigation/>
  </div>
</template>

<script>
import Navigation from './components/base/Navigation.vue'

export default {
  components: {
    Navigation,
  },

  created () {
    if (!this.$store.state.isLoggedIn && this.$router.path !== '/login') {
      this.$store.dispatch('unathorizedAccess', {path: '/login'})
    }
  },

  methods: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    },
  },
};

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
