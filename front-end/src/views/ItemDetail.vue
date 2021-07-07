<template>
  <div class="container">
    <div class="modal-header">
      <button @click="deleteItem"><i class="far fa-trash-alt"></i></button>
      <a @click="$router.go(-1)"><i class="fas fa-times"></i></a>
    </div>
    <div v-if="isEditing">
      <h2>Edit Item</h2>
      <table class="input-container">
        <tr>
          <td>
            <label>Name:</label>
          </td>
          <td>
            <input v-model="newName" />
          </td>
        </tr>
        <tr v-for="(property, index) in inventoryProperties" :key="index">
          <td>
            <label>{{ property }}:</label>
          </td>
          <td>
            <input v-model="newProperties[index]" />
          </td>
        </tr>
        <tr>
          <td>
            <label>Quantity:</label>
          </td>
          <td>
            <input v-model="newQty" type="number" />
          </td>
        </tr>
      </table>
      <div class="bottom-buttons">
        <button @click="cancelEdit">Cancel</button>
        <button @click="saveItem">Save</button>
      </div>
    </div>
    <div v-else>
      <h2>Item Details</h2>
      <table class="input-container">
        <tr>
          <td>
            <p>Name:</p>
          </td>
          <td>
            <p>{{ item.name }}</p>
          </td>
        </tr>
        <tr v-for="(property, index) in inventoryProperties" :key="index">
          <td>
            <p>{{ property }}:</p>
          </td>
          <td>
            <p>{{ item.properties[property] }}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Quantity:</p>
          </td>
          <td>
            <p>{{ item.qty }}</p>
          </td>
        </tr>
      </table>
      <div class="bottom-buttons">
        <button @click="editItem">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isEditing: false,
      item: this.$root.$data.store.inventoryItems[
        this.$root.$data.store.activeInventory
      ].find((x) => x._id == this.$route.params.itemId),
      newName: "",
      newQty: 0,
      newProperties: [],
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
  created() {
    this.newName = this.item.name;
    this.newQty = this.item.qty;
    this.newProperties = this.$root.$data.store.properties[
      this.$root.$data.store.activeInventory
    ].map((x) => this.item.properties[x]);
  },
  methods: {
    async deleteItem() {
      let res = await axios.delete("/api/item/" + this.item._id);

      if (res.status === 200) {
        this.inventory.splice(
          this.inventory.findIndex((x) => x._id == this.item._id),
          1
        );
        this.$router.go(-1);
      }
    },
    editItem() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    async saveItem() {
      let updatedItem = {};
      updatedItem.name = this.newName;
      updatedItem.qty = this.newQty;
      updatedItem.properties = {};
      this.newProperties.forEach(
        (value, index, arr) =>
          (updatedItem.properties[this.inventoryProperties[index]] = value)
      );
      let res = await axios.put("/api/item/" + this.item._id, updatedItem);

      if (res.status === 200) {
        this.item.name = this.newName;
        this.item.qty = this.newQty;
        this.newProperties.forEach(
          (value, index, arr) =>
            (this.item.properties[this.inventoryProperties[index]] = value)
        );

        this.isEditing = false;
      }
    },
  },
};
</script>

<style>
.modal-header {
  text-align: end;
  padding-top: 10px;
  padding: 10px 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.modal-header > button {
  margin-right: auto;
}

.modal-header > a {
  grid-column-start: 3;
  font-size: 1.5em;
  margin-left: auto;
}

.modal-header:first-child {
  margin-right: auto;
}

.modal-header > a:hover {
  cursor: pointer;
  color: gray;
}

.modal-header > button:hover {
  cursor: pointer;
}

.input-container {
  margin: 20px auto;
  padding: 0 30px;
}

.bottom-buttons {
  margin-bottom: 30px;
  margin-right: 30px;
  text-align: end;
}

.bottom-buttons > button:hover {
  cursor: pointer;
}

td {
  vertical-align: text-top;
}

p {
  margin: 0;
  padding: 1px 0;
}

.add-form {
  margin-bottom: 30px;
}
</style>
