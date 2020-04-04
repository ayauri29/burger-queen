<template lang="pug">
div
  .d-flex
    .container-menu
      h1 MENÚ
      .d-flex()
        b-button.btn-filter(v-for="filter in filters" @click="filterType(filter)") {{filter}}
      .d-flex.flex-wrap
        .box(v-for="prod in prodFilters")
          img.widthImg(:src="prod.imagen")
          i(@click="addCart(prod, `btn-${prod.nombre}`)") +
          h2 {{prod.nombre}}
          p $ {{prod.precio}}.00
            //- b-button.btn-precio $ {{prod.precio}}.00
          //- em(slot="footer")
          //-   .d-flex
          //-     b-button(@click="addCart(prod, `btn-${prod.nombre}`)") Add to cart
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
      const allProd = [...this.breakfast];
      console.log(allProd, "all");
      const arr = allProd.filter((prod) => prod.subtipo === type);
      console.log(arr, "filter");
      this.prodFilters = [...arr];
      console.log(this.prodFilters, "poiuhu");
    },
    addCart(item, id) {
      // item.cantidad = 1
      // item.subtotal = item.cantidad*item.precio
      this.cart.push(item);
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
h1 {
  text-align: center;
}
.box {
  width: 230px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 0 10px;
  position: relative;
}
.box img {
  width: 230px;
}
.box i {
  width: 50px;
  height: 50px;
  background: #ed277f;
  color: #ffffff;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  font-size: 1.4rem;
  position: absolute;
  right: 20px;
  top: 150px;
  box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.box i:hover {
  transform: scale(1.05);
}

.box h2 {
  margin-left: 20px;
}
.boxp {
  margin-left: 20px;
}
.btn-filter {
  background-color: #715aff;
  color: white;
  text-transform: uppercase;
}
.btn-precio {
  background-color: #55c1ff;
  color: white;
}
.widthImg {
  height: 120px;
  width: 150px;
}
.reserve {
  display: none;
}

@media screen and (min-width: 764px) {
  .reserve {
    display: block;
    width: 40%;
    /* position: fixed;
  right: 0; */
    margin: 2%;
  }
  .responsiveCart{
    display: none;
  }
}
</style>
