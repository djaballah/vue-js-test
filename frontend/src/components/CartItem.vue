<script>
import { formatCurrency } from "../utilities/formatter";

export default {
  props: ["robotName", "store"],
  computed: {
    amount() {
      return this.store.state.selectedRobots.get(this.robotName).amount;
    },
    price() {
      return formatCurrency(
        this.store.state.selectedRobots.get(this.robotName).price * this.amount
      );
    },
    imageLink() {
      return this.store.state.selectedRobots.get(this.robotName).imageLink;
    },
    stock() {
      return this.store.state.selectedRobots.get(this.robotName).stock;
    },
  },
  methods: {
    addRobot() {
      this.store.increaseSelectedRobot(this.robotName);
    },
    removeRobot() {
      this.store.decreaseSelectedRobot(this.robotName);
    },
  },
};
</script>

<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="this.imageLink" class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ this.robotName }}</h5>
          <div>
            <small class="card-text">Amount: {{ this.amount }}</small>
          </div>
          <div>
            <small class="card-text">Total price: {{ this.price }}</small>
          </div>
          <div>
            <button
              title="Remove one robot from this type"
              class="col-3 btn btn-primary me-2"
              type="button"
              @click="removeRobot"
            >
              -
            </button>
            <button
              title="Add one more robot of this type"
              class="col-3 btn btn-primary"
              type="button"
              :disabled="this.stock <= 0"
              @click="addRobot"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
