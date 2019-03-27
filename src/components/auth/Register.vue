<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div v-if="errors" class="errors">
        <span v-for="error in errors">
          {{ error }}
        </span>
      </div>
      <label for="name">Name</label>
      <div>
          <input id="name" type="text" v-model="name" required autofocus>
      </div>
      <label for="email" >E-Mail Address</label>
      <div>
          <input id="email" type="email" v-model="email" required>
      </div>
      <label for="password">Password</label>
      <div>
          <input id="password" type="password" v-model="password" required>
      </div>
      <label for="password-confirm">Confirm Password</label>
      <div>
          <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>
      <div>
          <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: [],
    };
  },
  methods: {
    checkPasswords: function () {
      if (this.password == this.password_confirmation) {
        return true;
      } return false;
    },

    register: function() {
      this.errors = [];
      if (this.checkPasswords()) {
        let data = {
          username: this.name,
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("register", data)
          .then(() => this.$router.push("/"))
          .catch(err => console.log(err));
      } else {
        let error = "Passwords are not the same"
        this.errors.push(error);
      };
    }
  }
  };
</script>

<style lang="scss" scoped>
.errors {
  font-size: 0.9em;
  color:red;
  margin: 0 0 15px;
}
</style>