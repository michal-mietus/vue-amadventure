<template>
  <div class="containter">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input
          required
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          v-model="username"
        >
      </div>
      <div>
        <label for="password">Password</label>
        <input
          required
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          v-model="password"
        >
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login: function () {
      const username = this.username;
      const password = this.password;
      this.$store
        .dispatch('login', { username, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.error(err));
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  display: block;
}

</style>
