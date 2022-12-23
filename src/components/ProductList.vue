<template>
  <div class="container">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">Ref</th>
          <th scope="col">Name</th>
          <th scope="col">City</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.ref">
          <Product :item="product" />
        </tr>
      </tbody>
    </table>
    <div class="row mt-3">
      <button type="button" class="btn btn-primary">Add New Product</button>
    </div>
  </div>
</template>

<script>
import Product from "./Product.vue";
export default {
  name: "ProductList",
  components: {
    Product,
  },

  data() {
    return {
      addNew: false,
      newProd: {
        ref: "",
        name: "",
        city: "",
        price: "",
      },
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>

<style scoped lang="scss"></style>
