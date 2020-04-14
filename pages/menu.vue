<template lang="pug">
.container
  .d-flex
    .container-menu
      h1 MENÚ
      .d-flex.div-filters
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
    hr
    .reserve
      Reserve(:reserva="cart" :num="orders.length")

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { StoreDB } from "../plugins/firebase";
import Reserve from "../components/reserve";
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import config from "../plugins/firebase";

// if (!firebase.apps.length) {
//    firebase.initializeApp(DB_CONFIG);
// }
// let db = firebase.initializeApp(config).firestore();
// let db = app.database();
// let ordenesRef = db.ref("ordenes");

export default {
  components: {
    Reserve
  },
  data() {
    return {
      prodFilters: [],
      filters: ["desayuno", "acompañamiento", "hamburguesa", "bebida"],
      cart: []
    };
  },
  async asyncData() {
    let prodArray = [];
    await StoreDB.collection("desayuno")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          prodArray.push(doc.data());
        });
      });

    let orderArray = [];
    await StoreDB.collection("ordenes")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          orderArray.push(doc.data());
        });
      });
    return {
      breakfast: prodArray,
      orders: orderArray
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
      const arr = allProd.filter(prod => prod.tipo === type);
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
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap");
* {
  font-family: "Be Vietnam", sans-serif;
}
.container {
  /* background-color: #292929; */
  margin: 0;
  min-width: 100%;
}
.container-menu {
  width: 60%;
}
.div-filters {
  margin: 4%;
  justify-content: space-evenly;
}
h1 {
  text-align: center;
}
.box {
  width: 230px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 2% 1%;
  position: relative;
  height: 32vh;
}
.box img {
  width: 230px;
}
.box i {
  width: 50px;
  height: 50px;
  background: #e41c43;
  color: #ffffff;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  font-size: 1.4rem;
  position: absolute;
  right: 15px;
  top: 149px;
  box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.box i:hover {
  transform: scale(1.05);
}

.box h2 {
  margin-left: 20px;
  font-size: 18px;
  width: 54%;
}
.boxp {
  margin-left: 20px;
}
.btn-filter {
  background-color: white;
  color: black;
  text-transform: uppercase;
  border: 3px solid #e41c43;
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
  .responsiveCart {
    display: none;
  }
}
</style>
