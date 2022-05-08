<script>
import RobotCard from "../components/RobotCard.vue";

export default {
  data() {
    return {
      robots: [],
    };
  },
  async created() {
    try {
      const res = await fetch("http://localhost:8000/api/robots");
      this.robots = await res.json();
      this.robots = this.robots.data;
    } catch {
      alert("cannot fetch robots");
    }
  },
  components: {
    RobotCard,
  },
};
</script>

<template>
  <div class="mt-5">
    <div class="row gy-4">
      <div v-for="robot in this.robots" :key="robot.name" class="col">
        <RobotCard
          :name="robot.name"
          :imageLink="robot.image"
          :material="robot.material"
          :createdAt="robot.createdAt"
          :stock="robot.stock"
          :price="robot.price"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
