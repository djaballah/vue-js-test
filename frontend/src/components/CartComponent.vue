<script>
import CartItem from "./CartItem.vue";

export default {
  props: ["store"],
  data() {
    return {
      totalAmount: 0,
      totalPrice: 0,
    };
  },
  components: {
    CartItem,
  },
};
</script>

<template>
  <div class="card cart">
    <div class="card-body">
      <h5 class="card-title">Cart</h5>
      <CartItem
        v-for="[robotName, robot] in this.store.state.selectedRobots.entries()"
        :key="robot.name"
        :robotName="robotName"
        :store="this.store"
      />
      <p class="card-text">Total amount: {{ this.totalAmount }}</p>
      <p class="card-text">Total price: {{ this.totalPrice }}</p>
    </div>
  </div>
</template>

<style scoped>
.cart {
  overflow-y: scroll;
  max-height: 90vh;
  width: 22rem;
}
</style>
