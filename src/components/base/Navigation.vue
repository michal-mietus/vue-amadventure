<template>
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/hero/owned">Hero</router-link> |
    <router-link to="/expedition">Expedition</router-link>
    <span v-if="isLoggedIn()">
      <span> | <a @click="logout">Logout</a></span>
    </span>
    <span v-else>
      <span> | <router-link to="/login">Login</router-link></span>
      <span> | <router-link to="/register">Register</router-link></span>
    </span>
    <router-view/>
  </div>
</template>

<script>
  export default {
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

<style lang="scss" scoped>
template {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
