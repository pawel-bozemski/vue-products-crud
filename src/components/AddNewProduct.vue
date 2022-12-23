<template>
  <form class="mt-2">
    <div class="row">
      <div class="col">
        <label for="add-product-ref">Product Ref</label>
        <input
          type="number"
          class="form-control"
          id="add-product-ref"
          placeholder="Product ref"
          v-model="product.ref"
          required
        />
      </div>
      <div class="col">
        <label for="add-product-name">Product Name</label>
        <input
          type="text"
          class="form-control"
          id="add-product-name"
          placeholder="Product name"
          v-model="product.name"
          required
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="add-product-city">Product City</label>
        <input
          type="text"
          class="form-control"
          id="add-product-city"
          placeholder="Product city"
          v-model="product.city"
          required
        />
      </div>
      <div class="col">
        <label for="add-product-price">Product Price</label>
        <input
          type="number"
          class="form-control"
          id="add-product-price"
          placeholder="Product price"
          v-model="product.price"
          required
        />
      </div>
    </div>

    <div class="row container mt-3">
      <button type="submit" class="btn btn-primary" @click="addNew()">
        Save
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddNewProduct",
  data() {
    return {
      product: {
        ref: "",
        name: "",
        city: "",
        price: "",
      },
    };
  },
  computed: {},
  methods: {
    addNew() {
      if (
        this.product.ref &&
        this.product.name &&
        this.product.city &&
        this.product.price
      ) {
        this.$parent.addNew = false;
        const payload = {
          ref: this.product.ref,
          name: this.product.name,
          city: this.product.city,
          price: this.product.price,
        };
        this.$store.dispatch("addProduct", payload);
      } else {
        alert("Complete missing data");
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
