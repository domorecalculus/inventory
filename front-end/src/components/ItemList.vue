<template>
  <div>
    <router-link
      tag="div"
      class="item-container"
      :to="$route.path + `/${item.id}`"
      v-for="item in items"
      :key="item.id"
    >
      <inventory-item :item="item" />
    </router-link>
  </div>
</template>

<script>
import InventoryItem from "./InventoryItem.vue";

export default {
  props: {
    items: [],
  },
  components: {
    InventoryItem,
  },
};
</script>

<style>
</style>
