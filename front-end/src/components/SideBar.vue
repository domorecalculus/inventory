<template>
  <div class="background">
    <div class="sidebar-header">
      <h2>Inventories</h2>
      <a @click="goToCreate"><i class="fas fa-plus"></i></a>
    </div>
    <a
      v-for="inventory in inventories"
      :key="inventory"
      :class="activeInventory == inventory ? 'active' : 'disabled'"
      class="inventory-line"
      @click="switchActiveInventory(inventory)"
    >
      {{ inventory }}
    </a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SideBar",
  async created() {
    let res = await axios.get("/api/inventory");
    console.log(res);
    if (res.status === 200) {
      for (let index in res.data) {
        this.$set(
          this.$root.$data.store.properties,
          res.data[index].name,
          res.data[index].properties
        );
        this.$set(
          this.$root.$data.store.inventoryId,
          res.data[index].name,
          res.data[index]._id
        );
      }
      if (res.data.length > 0 && this.$route.path === "/inventory") {
        this.$root.$data.store.activeInventory = res.data[0].name;
        console.log(this.$root.$data.store.activeInventory);
      }
    }
    await this.getItems();
  },
  computed: {
    activeInventory: function () {
      return this.$root.$data.store.activeInventory;
    },
    inventories() {
      return Object.keys(this.$root.$data.store.properties);
    },
  },
  methods: {
    switchActiveInventory(newInventory) {
      this.$root.$data.store.activeInventory = newInventory;
      if (this.$route.path !== "/inventory") {
        this.$router.push("/inventory");
      }
    },
    goToCreate() {
      this.$router.push("/create-inventory");
    },
    async getItems() {
      console.log("active: " + this.$root.$data.store.activeInventory);
      const res = await axios.get(
        "/api/item?inventory=" +
          this.$root.$data.store.inventoryId[
            this.$root.$data.store.activeInventory
          ]
      );
      console.log(res);

      if (res.status === 200) {
        if (
          this.$root.$data.store.activeInventory in
          this.$root.$data.store.inventoryItems
        ) {
          this.$root.$data.store.inventoryItems[
            this.$root.$data.store.activeInventory
          ] = res.data;
        } else {
          this.$set(
            this.$root.$data.store.inventoryItems,
            this.$root.$data.store.activeInventory,
            res.data
          );
        }
      }
    },
  },
};
</script>

<style scoped>
.background {
  background-color: lightgray;
}
.inventory-line {
  display: block;
  height: 2em;
  line-height: 2em;
  border-bottom: 1px solid darkgray;
}

.inventory-line:hover {
  cursor: pointer;
  background-color: #e9e9e9;
}

.active {
  background-color: white;
}

.active:hover {
  background-color: white;
}

.sidebar-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
}

.sidebar-header > h2 {
  grid-column-start: 2;
  font-weight: bold;
  color: #2c3e50;
}

.sidebar-header > a {
  margin-left: auto;
  padding-right: 10px;
}

.sidebar-header > a:hover {
  cursor: pointer;
  color: gray;
}
</style>
