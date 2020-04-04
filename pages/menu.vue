<template lang="pug">
  .d-flex
    .container-menu
      h1 MENÚ
      .d-flex(v-for="filter in filters")
        b-button.btn-filter(@click="filterType(filter)") {{filter}}
      .d-flex.flex-wrap
        b-card.cardProd(v-for="prod in prodFilters" :header="prod.nombre")
          .d-flex.flex-column.align-items-center
            img.widthImg(:src="prod.imagen")
            b-button.btn-precio $ {{prod.precio}}.00
          em(slot="footer")
            .d-flex
              //- b-form-spinbutton(:id="`btn-${prod.nombre}`" v-model="prod.cantidad" min="0" type="number" @change="addCart(prod, `btn-${prod.nombre}`)")
              b-button(@click="addCart(prod, `btn-${prod.nombre}`)") Add to cart
    .reserve
      Reserve(:reserva="cart")

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { StoreDB } from "../plugins/firebase";
import Reserve from "../components/reserve";
export default {
  components: {
    Reserve,
  },
  data() {
    return {
      prodFilters: [],
      filters: ["desayuno", "almuerzo y cena"],
      cart: [],
    };
  },
  async asyncData() {
    let prodArray = [];
    await StoreDB.collection("desayuno")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          prodArray.push(doc.data());
        });
      });
    return {
      breakfast: prodArray,
    };
  },
  mounted() {
    this.filterType("desayuno");
  },
  methods: {
    ...mapActions("cart", ["SET_CART"]),
    filterType(type) {
      const allProd = [...this.breakfast]
      console.log(allProd, 'all')
      const arr = allProd.filter((prod) => prod.subtipo === type);
      console.log(arr, 'filter')
      this.prodFilters = [...arr]
      console.log(this.prodFilters,'poiuhu')

    },
    addCart(item, id) {
      // item.cantidad = 1
      // item.subtotal = item.cantidad*item.precio
      this.cart.push(item)
      // const verify = this.cart.some((el) => el.nombre === item.nombre);
      // console.log(verify, this.cart)
      // if (verify) {
      //   const index = this.cart.findIndex((el) => el.nombre === item.nombre);
      //   this.cart[index].cantidad = parseInt(this.cart[index].cantidad) + 1;
      //   // console.log(this.cart[index]["cantidad"], 'cantidad')
      //   this.cart[index]["subtotal"] =
      //     parseInt(this.cart[index].cantidad) *
      //     parseInt(this.cart[index].precio);
      // }
      // else {
      //   item.cantidad = 1;
      //   item.subtotal = item.precio * item.cantidad;
      //   this.cart.push(item);
      // }
    },
  },
};
</script>

<style scoped>
.container-menu {
  width: 60%;
}
h1{
  text-align: center;
}
.cardProd {
  width: 22%;
  margin: 2%;
}
.btn-filter{
  background-color: #715AFF;
  color: white;
  text-transform: uppercase;
}
.btn-precio{
  background-color: #55C1FF;
  color: white;
}
.widthImg {
  height: 120px;
  width: 150px;
}
.reserve {
  width: 40%;
  /* position: fixed;
  right: 0; */
  margin:2%;
}
</style>
