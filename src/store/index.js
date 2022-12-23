import { createStore } from "vuex";

export default createStore({
  state: {
    products: [
      {
        ref: 1,
        name: "Product 1",
        city: "Warsaw",
        price: 12,
      },
      {
        ref: 2,
        name: "Product 2",
        city: "Berlin",
        price: 321,
      },
      {
        ref: 3,
        name: "Product 3",
        city: "Lublin",
        price: 157,
      },
      {
        ref: 4,
        name: "Product 4",
        city: "Wrocław",
        price: 125,
      },
      {
        ref: 5,
        name: "Product 5",
        city: "Poznań",
        price: 1,
      },
    ],
  },
  getters: {},
  mutations: {
    ADD_PRODUCT(state, payload) {
      state.products.push({
        ref: payload.ref,
        name: payload.name,
        city: payload.city,
        price: payload.price,
      });
    },
    EDIT_PRODUCT(state, payload) {
      const product = state.products.find((item) => item.ref === payload.ref);
      product.name = payload.name;
      product.city = payload.city;
      product.price = payload.price;
    },
    REMOVE_PRODUCT(state, payload) {
      const i = state.products.map((item) => item.ref).indexOf(payload.ref);
      state.products.splice(i, 1);
    },
  },
  actions: {
    addProduct({ commit }, payload) {
      commit(`ADD_PRODUCT`, payload);
    },
    editProduct({ commit }, payload) {
      commit(`EDIT_PRODUCT`, payload);
    },
    removeProduct({ commit }, payload) {
      commit(`REMOVE_PRODUCT`, payload);
    },
  },
  modules: {},
});
