<template lang="pug">
.container
  .d-flex.main-page
    .container-menu
      //- h1 MENÚ
      .d-flex.div-filters
        b-button.btn-filter(v-for="filter in filters" @click="filterType(filter)") {{filter}}
      .d-flex.flex-wrap.justify-content-center
        .box(v-for="prod in prodFilters")
          img.widthImg(:src="prod.imagen")
          i(@click="addCart(prod, `btn-${prod.nombre}`)") +
          h2 {{prod.nombre}}
          p.p-price $ {{prod.precio}}.00
            //- b-button.btn-precio $ {{prod.precio}}.00
          //- em(slot="footer")
          //-   .d-flex
          //-     b-button(@click="addCart(prod, `btn-${prod.nombre}`)") Add to cart
    hr
    .reserve
      Reserve.reserve_table(:reserva="cart" :num="orders.length")
    .reserve-mod(v-if="cart.length > 0")
      p(v-if="cart.length > 1") Tienes {{cart.length}} pedidos para enviar a la cocina
      p(v-if="cart.length === 1") Tienes {{cart.length}} pedidos para enviar a la cocina
      b-button(v-b-modal.modal-1) Ver mis órdenes
      b-modal(id="modal-1" title="BootstrapVue")
        Reserve.reserve_table(:reserva="cart" :num="orders.length")

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
  height: 90vh;
  padding: 0;
}
.container-menu {
  width: 100%;
}
.div-filters {
  margin: 4%;
  justify-content: space-evenly;
  flex-wrap: wrap;
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
  font-size: 1.8rem;
  position: absolute;
  right: 15px;
  font-style: initial;
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
  color: #e41c43;
  text-transform: uppercase;
  border: 1.1px solid #000000;
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
.reserve_table {
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding: 5%;
}
.p-price {
  text-align: center;
}
.main-page {
  flex-direction: column;
}
.reserve-mod {
  border-top: 1px solid #e41c43;
  display: block;
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  padding: 4%;
}
@media screen and (min-width: 764px) {
  .reserve-mod {
    display: none;
  }
  .container-menu {
    width: 60%;
  }
  .main-page {
    flex-direction: row;
  }
  .reserve {
    display: block;
    width: 40%;
    /* margin: 2%; */
    background-color: #ffeeba;
  }
  .responsiveCart {
    display: none;
  }
}
</style>
