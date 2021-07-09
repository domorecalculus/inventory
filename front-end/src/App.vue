<template>
  <div id="app">
    <div class="header">
      <h1><i class="far fa-clipboard title-icon" />Jota Organizer</h1>
      <button v-if="user" class="pure-button sign-out" @click="signout">
        Sign out <i class="fas fa-sign-out-alt" />
      </button>
    </div>
    <div>
      <div v-if="user" class="content">
        <side-bar class="side-bar" />
        <router-view />
      </div>
      <div v-else class="content">
        <authenticator class="authenticator" />
      </div>
    </div>
    <div class="footer">
      <p>
        Look at source on
        <a href="https://github.com/domorecalculus/cs260-cp5">Github</a>. This
        project took 4 hours and 45 minutes.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SideBar from "./components/SideBar.vue";
import Authenticator from "./views/Authenticator.vue";

export default {
  created() {
    this.getUser();
  },
  components: {
    SideBar,
    Authenticator,
  },
  computed: {
    user() {
      return this.$root.$data.store.user;
    },
  },
  methods: {
    async getUser() {
      const res = await axios.get("/api/users");
      if (res.status === 200) {
        this.$set(this.$root.$data.store, "user", res.data.user);
      }
    },
    async signout() {
      const res = await axios.delete("/api/users");
      if (res.status === 200) {
        this.$root.$data.store.user = undefined;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.header {
  background-color: navy;
  color: white;
  height: 5vh;
  min-height: 5em;
  display: flex;
  align-content: center;
  justify-content: start;
}

.title-icon {
  margin-left: 1em;
  margin-right: 0.3em;
}

.sign-out {
  color: white;
  background: navy;
  font-weight: bold;
  border-radius: 5px;
  border: 2px solid navy;
  height: 2em;
  line-height: 0.8em;

  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: 30px;
}

.sign-out:hover {
  font-size: 1.2em;
}

.content {
  display: grid;
  grid-template-columns: 15fr 85fr;
  min-height: 95vh;
}

.authenticator {
  margin: auto;
  grid-column: 1 / 3;
}

.footer {
  background-color: darkgray;
  height: 3em;
  width: 100%;
}

.footer > p {
  line-height: 3em;
}

.side-bar {
  min-width: 250px;
  max-width: 400px;
  width: 15%;
}
</style>
