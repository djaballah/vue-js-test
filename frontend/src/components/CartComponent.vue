<script>
import CartItem from "./CartItem.vue";
import { formatCurrency } from "../utilities/formatter";

export default {
  props: ["store"],
  computed: {
    totalAmount() {
      let totalAmount = 0;
      this.store.state.selectedRobots.forEach((value) => {
        totalAmount += value.amount;
      });
      return totalAmount;
    },
    totalPrice() {
      let totalPrice = 0;
      this.store.state.selectedRobots.forEach((value) => {
        totalPrice += parseFloat(value.price) * value.amount;
      });
      return formatCurrency(totalPrice);
    },
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
