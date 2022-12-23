<template>
  <th scope="row">
    <input
      type="number"
      class="form-control"
      id="product-ref"
      :placeholder="product.ref"
      v-model="product.ref"
      :readonly="this.edit === false"
      required
    />
  </th>
  <td>
    <input
      type="text"
      class="form-control"
      id="product-name"
      :placeholder="product.name"
      v-model="product.name"
      :readonly="this.edit === false"
      required
    />
  </td>
  <td>
    <input
      type="text"
      class="form-control"
      id="product-city"
      :placeholder="product.city"
      v-model="product.city"
      :readonly="this.edit === false"
      required
    />
  </td>
  <td>
    <input
      type="number"
      class="form-control"
      id="product-price"
      :placeholder="product.price"
      v-model="product.price"
      :readonly="this.edit === false"
      required
    />
  </td>
  <td>
    <button
      type="button"
      class="btn btn-danger ml-3"
      @click="this.removeProduct(this.product.ref)"
    >
      Remove
    </button>
    <button
      v-if="this.edit === false"
      type="button"
      class="btn btn-warning"
      @click="this.editProduct"
    >
      Edit
    </button>
    <button
      v-else
      type="submit"
      class="btn btn-primary"
      @click="this.saveProduct"
    >
      Save
    </button>
  </td>
</template>

<script>
export default {
  name: "ProductList",
  props: ["item"],
  data() {
    return {
      product: {
        ref: this.item.ref,
        name: this.item.name,
        city: this.item.city,
        price: this.item.price,
      },
      edit: false,
    };
  },
  computed: {},
  methods: {
    removeProduct(ref) {
      const payload = {
        ref: ref,
      };
      console.log(payload);
      this.$store.dispatch("removeProduct", payload);
    },
    editProduct() {
      this.edit = true;
    },
    saveProduct() {
      if (
        this.product.ref &&
        this.product.name &&
        this.product.city &&
        this.product.price
      ) {
        this.edit = false;
        const payload = {
          ref: this.product.ref,
          name: this.product.name,
          city: this.product.city,
          price: this.product.price,
        };
        this.$store.dispatch("editTask", payload);
      } else {
        alert("Complete missing data");
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
