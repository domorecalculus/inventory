<template>
  <div class="container">
    <h2>Create an Inventory</h2>
    <div class="name-container">
      <label>Name: </label>
      <input type="text" v-model="name" />
      <p v-if="alreadyExists">
        Name must be unique from your other inventories
      </p>
    </div>
    <div class="properties-container">
      <label class="properties-label">Item Properties</label>
      <ul>
        <li>Name</li>
        <li v-for="(property, index) in [...properties, '']" :key="index">
          <input
            @keyup="keyupCheck(index)"
            v-model="properties[index]"
            placeholder="Add a property..."
          />
        </li>
        <li>Quantity</li>
      </ul>
    </div>
    <div class="create-container">
      <button
        class="pure-button"
        @click="createInventory"
        :disabled="alreadyExists || name === ''"
      >
        Create
      </button>
    </div>
    <p v-if="serverError">
      There was an error creating your inventory, please try again.
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      properties: [],
      serverError: false,
    };
  },
  created() {
    this.$root.$data.store.activeInventory = "";
  },
  computed: {
    alreadyExists: function () {
      return this.name in this.$root.$data.store.properties;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (newVal) {
        this.showModal = newVal.meta && newVal.meta.showModal;
      },
    },
  },
  components: {},
  methods: {
    async createInventory() {
      let res = await axios.post("/api/inventory", {
        name: this.name,
        properties: this.properties,
      });
      if (res.status == 200) {
        this.$set(this.$root.$data.store.inventoryItems, this.name, []);
        this.$set(
          this.$root.$data.store.properties,
          this.name,
          this.properties
        );
        this.$root.$data.store.activeInventory = this.name;
        this.$router.push("/inventory");
      } else {
        this.serverError = true;
      }
    },
    keyupCheck(index) {
      if (this.properties[index] === "") {
        this.properties.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
}

h2 {
  font-size: 1.7em;
}

.name-container {
  font-size: 1.5em;
  height: 3.3em;
}

.name-container:first-child {
  margin-right: 15px;
}

.container > p {
  color: red;
  white-space: nowrap;
}

.name-container > p {
  font-size: 0.8em;
  color: red;
  white-space: nowrap;
}

.properties-container {
  text-align: start;
}

.properties-label {
  font-size: 1.3em;
}

ul {
  list-style-type: none;
  padding-left: 1em;
}

ul li {
  margin-top: 10px;
}

ul li:before {
  content: "-";
  position: absolute;
  margin-left: -1em;
}

.create-container {
  text-align: right;
}
</style>
