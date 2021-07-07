<template>
  <div>
    <div class="modal-header">
      <a @click="$router.go(-1)"><i class="fas fa-times"></i></a>
    </div>
    <h2>Add a New Item</h2>
    <div class="add-form">
      <table class="input-container">
        <tr>
          <td>
            <label>Name:</label>
          </td>
          <td>
            <input v-model="name" />
          </td>
        </tr>
        <tr v-for="(property, index) in inventoryProperties" :key="index">
          <td>
            <label>{{ property }}:</label>
          </td>
          <td>
            <input v-model="properties[index]" />
          </td>
        </tr>
        <tr>
          <td>
            <label>Quantity:</label>
          </td>
          <td>
            <input v-model="qty" type="number" />
          </td>
        </tr>
      </table>
      <button class="save pure-button" @click="saveItem">Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddItem",
  data() {
    return {
      name: "",
      properties: [],
      qty: 0,
    };
  },
  computed: {
    inventory: function () {
      return this.$root.$data.store.inventoryItems[
        this.$root.$data.store.activeInventory
      ];
    },
    inventoryProperties() {
      return this.$root.$data.store.properties[
        this.$root.$data.store.activeInventory
      ];
    },
  },
  methods: {
    async saveItem() {
      let item = {
        name: this.name,
        qty: this.qty,
        inventory:
          this.$root.$data.store.inventoryId[
            this.$root.$data.store.activeInventory
          ],
      };
      let propertiesPayload = {};
      for (let property in this.inventoryProperties) {
        propertiesPayload[this.inventoryProperties[property]] =
          this.properties[property];
      }
      item.properties = propertiesPayload;
      let createdItem = await axios.post("/api/item", item);
      console.log("Added item: ");
      console.log(createdItem);
      this.inventory.push(createdItem.data);
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.modal-header {
  text-align: end;
  padding-top: 10px;
  padding-right: 15px;
}

.modal-header > a {
  font-size: 1.5em;
}

.modal-header > a:hover {
  cursor: pointer;
  color: gray;
}

.input-container {
  margin: 20px auto;
}

.add-form {
  margin-bottom: 30px;
}
</style>
