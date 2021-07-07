<template>
  <div id="app">
    <div class="header">
      <h1><i class="far fa-clipboard title-icon"></i>Jota Organizer</h1>
    </div>
    <div class="content">
      <side-bar class="side-bar" />
      <router-view />
    </div>
    <div class="footer">
      <p>
        Look at source on
        <a href="https://github.com/domorecalculus/cs260-cp4">Github</a>
      </p>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  components: {
    SideBar,
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

.content {
  display: grid;
  grid-template-columns: 15fr 85fr;
  min-height: 95vh;
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
