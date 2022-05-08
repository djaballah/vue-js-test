<script>
import { formatCurrency } from "../utilities/formatter";

export default {
  props: [
    "name",
    "imageLink",
    "price",
    "stock",
    "createdAt",
    "material",
    "store",
  ],
  data() {
    return {
      selectedAmount: 1,
    };
  },
  computed: {
    formattedPrice() {
      return formatCurrency(this.price);
    },
    computedStock() {
      if (!this.store.state.selectedRobots.has(this.name)) {
        return this.stock;
      }

      return this.stock - this.store.state.selectedRobots.get(this.name).amount;
    },
    formattedDate() {
      const date = new Date(this.createdAt);
      return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    },
  },
  methods: {
    addRobotToCart() {
      if (this.selectedAmount > this.computedStock) {
        alert("The quantity you requested is not available in stock");
        return;
      }
      if (this.selectedAmount < 1) {
        alert("Selected quantity must be greater than 1");
        return;
      }
      const robot = {
        name: this.name,
        price: this.price,
        imageLink: this.imageLink,
        stock: this.computedStock - this.selectedAmount,
      };
      this.store.addRobotToCart(robot, this.selectedAmount);
    },
  },
};
</script>

<template>
  <div class="card" style="width: 18rem">
    <img :src="this.imageLink" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ this.name }}</h5>
      <ul>
        <li>Price: {{ this.formattedPrice }}</li>
        <li>Material: {{ this.material }}</li>
        <li>Created at: {{ this.formattedDate }}</li>
        <li>{{ this.computedStock }} available</li>
      </ul>
      <div class="input-group mb-2">
        <span class="input-group-text">Quantity</span>
        <input
          type="number"
          class="form-control"
          v-model="selectedAmount"
          min="1"
          :max="this.computedStock"
        />
      </div>
      <div class="row">
        <div class="d-grid col">
          <button
            class="btn btn-primary"
            type="button"
            @click="this.addRobotToCart"
            :disabled="this.computedStock <= 0"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
