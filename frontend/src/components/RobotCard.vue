<script>
export default {
  props: ["name", "imageLink", "price", "stock", "createdAt", "material"],
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "LKR",
      }).format(this.price);
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
        <li>Created at: {{ this.createdAt }}</li>
        <li>{{ this.stock }} available</li>
      </ul>
      <div class="input-group mb-2">
        <span class="input-group-text">Quantity</span>
        <input type="number" class="form-control" min="1" :max="this.stock" />
      </div>
      <div class="row">
        <div class="d-grid col">
          <button class="btn btn-primary" type="button">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
