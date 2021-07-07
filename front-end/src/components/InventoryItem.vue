<template>
  <div class="item-container">
    <img :src="item.img" />
    <p>{{ item.name + " " + item.qty }}</p>
  </div>
</template>

<script>
export default {
  name: "InventoryItem",
  props: {
    item: Object,
  },
};
</script>

<style>
.item-container {
  border: 1px solid black;
  border-radius: 5px;
  width: 100px;
  height: 150px;
}

.item-container img {
  height: 100px;
  width: 100px;
}
</style>
