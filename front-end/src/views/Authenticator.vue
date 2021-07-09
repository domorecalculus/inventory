<template>
  <div class="login-container">
    <h2>Sign Up</h2>
    <table>
      <tr>
        <td>
          <label>Prefered Name:</label>
        </td>
        <td>
          <input v-model="registerName" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Username:</label>
        </td>
        <td>
          <input v-model="registerUsername" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Password: </label>
        </td>
        <td>
          <input type="password" v-model="registerPassword" />
        </td>
      </tr>
    </table>
    <button class="pure-button authenticate-button" @click="signup">
      Sign Up
    </button>
    <hr id="splitter" />
    <h2>Login</h2>
    <table>
      <tr>
        <td>
          <label>Username:</label>
        </td>
        <td>
          <input v-model="loginUsername" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Password: </label>
        </td>
        <td>
          <input type="password" v-model="loginPassword" />
        </td>
      </tr>
    </table>
    <button class="pure-button authenticate-button" @click="login">
      Login
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      registerName: "",
      registerUsername: "",
      registerPassword: "",
      loginUsername: "",
      loginPassword: "",
    };
  },
  methods: {
    async signup() {
      const body = {
        name: this.registerName,
        username: this.registerUsername,
        password: this.registerPassword,
      };

      const res = await axios.post("/api/users", body);
      if (res.status === 200) {
        this.$set(this.$root.$data.store, "user", res.data.user);
      }
    },
    async login() {
      const body = {
        username: this.loginUsername,
        password: this.loginPassword,
      };

      const res = await axios.post("/api/users/login", body);
      if (res.status === 200) {
        this.$set(this.$root.$data.store, "user", res.data.user);
      }
    },
  },
};
</script>

<style>
.login-container {
  padding: 50px;
  padding-top: 30px;
  margin-left: auto;
  margin-right: auto;
  background: lightgray;
  border-radius: 10px;
}

input {
  border-radius: 5px;
  border: 1px solid;
  margin-bottom: 10px;
}

#splitter {
  margin: 40px 0;
  border-color: darkgray;
}

.authenticate-button {
  color: navy;
  background: white;
  font-weight: bold;
  border-radius: 5px;
  border: 2px solid navy;
}
</style>
