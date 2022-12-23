<template>
  <div class="container">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th @click="sort('ref')" scope="col">Ref</th>
          <th @click="sort('name')" scope="col">Name</th>
          <th @click="sort('city')" scope="col">City</th>
          <th @click="sort('price')" scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in sortedProducts" :key="product.ref">
          <Product :item="product" />
        </tr>
      </tbody>
    </table>
    <div class="row mt-3">
      <div class="col">
        <button class="btn btn-link" @click="prevPage" :disabled="noPrev">
          Previous
        </button>
        <button class="btn btn-link" @click="nextPage" :disabled="noNext">
          Next
        </button>
      </div>
    </div>
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
      products: [],
      currentSort: "ref",
      currentSortDir: "asc",
      pageSize: 5,
      currentPage: 1,
    };
  },
  created() {
    this.products = this.$store.state.products;
  },
  computed: {
    noPrev() {
      return this.currentPage === 1;
    },
    noNext() {
      console.log(this.products.length);
      return this.currentPage * this.pageSize > this.products.length;
    },
    sortedProducts() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.products
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },
  },
  methods: {
    addNewProduct() {
      this.addNew = true;
    },
    sort(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.products.length)
        this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
};
</script>

<style scoped lang="scss"></style>
