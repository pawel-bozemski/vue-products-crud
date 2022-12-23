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
      <button
        v-if="this.addNew === false"
        type="button"
        class="btn btn-primary"
        @click="addNewProduct"
      >
        Add New Product
      </button>
      <AddNewProduct v-else />
    </div>
  </div>
</template>

<script>
import Product from "./Product.vue";
import AddNewProduct from "./AddNewProduct.vue";
export default {
  name: "ProductList",
  components: {
    Product,
    AddNewProduct,
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
  methods: {
    addNewProduct() {
      this.addNew = true;
    },
  },
};
</script>

<style scoped lang="scss"></style>
