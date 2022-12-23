<template>
  <div class="container">
    <div class="row">
      <h2>Filters</h2>
      <div class="col">
        <label for="filter-product-ref">Filter by Ref and/or Name</label>
        <input
          type="text"
          class="form-control"
          id="filter-product-ref"
          placeholder="Product ref and/or name"
          v-model="this.filters.refOrName"
        />
      </div>
      <div class="col">
        <label for="filter-product-city"
          >Filter by cities (separate cities by comma)</label
        >
        <input
          type="text"
          class="form-control"
          id="filter-product-city"
          placeholder="Product city"
          v-model="this.filters.city"
        />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <label for="filter-product-priceMax">Filter by minimum price</label>
        <input
          type="number"
          class="form-control"
          id="filter-product-priceMax"
          placeholder="Product min price"
          v-model="this.filters.priceMin"
        />
      </div>
      <div class="col">
        <label for="filter-product-priceMax">Filter by maximum price</label>
        <input
          type="number"
          class="form-control"
          id="filter-product-priceMax"
          placeholder="Product max price"
          v-model="this.filters.priceMax"
        />
      </div>
    </div>
    <div class="row mt-5">
      <h2>Products</h2>
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
    </div>
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
      filters: {
        refOrName: "",
        name: "",
        city: "",
        priceMin: "",
        priceMax: "",
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
    this.filters.priceMin = this.products.reduce((prev, cur) =>
      cur.price < prev.price ? cur : prev
    ).price;
    this.filters.priceMax = this.products.reduce((prev, cur) =>
      cur.price > prev.price ? cur : prev
    ).price;
  },
  computed: {
    noPrev() {
      return this.currentPage === 1;
    },
    noNext() {
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
        })
        .filter((row) => {
          const ref = row.ref.toString().toLowerCase();
          const name = row.name.toLowerCase();
          const searchTerm = this.filters.refOrName
            .toLowerCase()
            .replace(/\s/g, "");
          return name.includes(searchTerm) || ref.includes(searchTerm);
        })
        .filter((row) => {
          const city = row.city.toLowerCase();
          const searchTerm = this.filters.city.toLowerCase();
          if (searchTerm.indexOf(",") > -1) {
            let split = searchTerm.split(",");
            return split.some((el) => city.includes(el.replace(/\s/g, "")));
          } else {
            return city.includes(searchTerm);
          }
        })
        .filter((row) => {
          return (
            row.price >= this.filters.priceMin &&
            row.price <= this.filters.priceMax
          );
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
