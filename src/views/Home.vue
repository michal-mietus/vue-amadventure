<template>
  <div class="home">
    <div class="container flex">
      <div v-if="isLoggedIn">
        <h2>Home</h2>
      </div>
      <div v-else>
        <router-link to="/login"  class="sign-button">
          <div>
              <p>Sign in</p>
          </div>
        </router-link>
        <router-link to="/register" class="sign-button">
          <div>
              <p>Sign up</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {

  },
  methods: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedin;
    }
  }
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sign-button {
  width: 10%;
  margin: 10px;
  background-color: #00FA9A;
  font-weight: bold;
}

.sign-button:hover {
  background-color: #00FF7F;
}
</style>
