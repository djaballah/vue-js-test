<script>
import RobotCard from "../components/RobotCard.vue";
import CartComponent from "../components/CartComponent.vue";
import Store from "./MarketStore";

export default {
  data() {
    return {
      allRobots: [],
      filteredRobots: [],
      materialFilter: "",
      store: new Store(),
    };
  },
  computed: {
    listMaterials() {
      return new Set(this.allRobots.map((robot) => robot.material));
    },
  },
  methods: {
    filterRobots() {
      this.filteredRobots = this.allRobots.filter(
        (robot) =>
          robot.material.toLowerCase() === this.materialFilter.toLowerCase()
      );
    },
    listAllRobots() {
      this.materialFilter = "";
      this.filteredRobots = this.allRobots;
    },
  },
  async created() {
    try {
      const res = await fetch("http://localhost:8000/api/robots");
      this.allRobots = await res.json();
      this.allRobots = this.allRobots.data;
      this.filteredRobots = this.allRobots;
    } catch {
      alert("cannot fetch robots");
    }
  },
  components: {
    RobotCard,
    CartComponent,
  },
};
</script>

<template>
  <div class="mt-5 mb-5">
    <div class="row">
      <div class="col-9">
        <div class="row">
          <div class="col-6">
            <div class="input-group mb-2">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="listAllRobots"
              >
                Refresh robots list
              </button>
              <select
                class="form-select"
                aria-label="Default select example"
                @change="filterRobots"
                v-model="materialFilter"
              >
                <option disabled selected value="">
                  Filter robots by material type
                </option>
                <option
                  v-for="material in this.listMaterials"
                  :key="material"
                  :value="material"
                >
                  {{ material }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row gy-4">
          <div
            v-for="robot in this.filteredRobots"
            :key="robot.name"
            class="col"
          >
            <RobotCard
              :name="robot.name"
              :imageLink="robot.image"
              :material="robot.material"
              :createdAt="robot.createdAt"
              :stock="robot.stock"
              :price="robot.price"
              :store="this.store"
            />
          </div>
        </div>
      </div>
      <div class="col-3">
        <CartComponent class="fixed-sidebar" :store="this.store" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fixed-sidebar {
  position: fixed;
}
</style>
