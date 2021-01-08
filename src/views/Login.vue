<template>
  <div class="login">
    <form action="" class="form" @submit.prevent="loginToSite">
      <h2>Login</h2>
      <div class="input-field">
        <label for="login">Login</label>
        <input type="text" class="input" id="login" v-model="login" />
      </div>

      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" class="input" id="password" v-model="password" />
      </div>

      <Button type="submit" class="btn-submit">
        Login
      </Button>
    </form>
  </div>
</template>

<script>
import Button from "../components/Button";
export default {
  name: "Login",
  components: { Button },
  data: () => ({
    login: "",
    password: ""
  }),
  methods: {
    loginToSite() {
      const login = process.env.VUE_APP_LOGIN;
      const password = process.env.VUE_APP_PASSWORD;

      if (this.login === login && this.password === password) {
        localStorage.setItem("isAuthorized", "true");
        this.$router.push("/snippets");
      } else {
        this.$toast.error("Login or password is incorrect!", {
          duration: 3000,
          position: "bottom"
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
  margin-top: 0;
  font-size: 3rem;
  color: $white;
}

.form {
  width: 40%;
  margin: 10% auto;
  display: flex;
  padding: 1.5em;
  border-radius: 6px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  background-color: $dark-gray;
  flex-direction: column;
}

label {
  font-size: 1.5rem;
  color: $text-label;
}

.input-field {
  margin-bottom: 2em;
}

.input {
  width: 100%;
  font-size: 2rem;
  outline: none;
  border: 2px solid $white;
  padding: 5px;
  border-radius: 4px;
  margin-top: 0.3em;
  color: $secondary;
  font-weight: 600;
}

.btn-submit {
  margin: 1em auto;
  width: 40%;
}

.btn-submit:active {
  transform: translateY(3px);
}
</style>
