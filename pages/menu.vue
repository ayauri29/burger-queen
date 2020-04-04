<template lang="pug">
  .d-flex
    .container-menu
      h1 Menu
      div(v-for="filter in filters")
        button(@click="filterType(filter)") {{filter}}
      p {{cart}}
      div.d-flex.flex-wrap
        b-card(v-for="prod in prodFilters" :header="prod.nombre")
          //- b-card-text {{prod.nombre}}
          img.widthImg(:src="prod.imagen")
          //- b-card-text {{prod.precio}}

          button( @click.prevent="") Agregar
          em(slot="footer")
            .d-flex
              p Precio {{prod.precio}}
              b-form-input(:id="`btn-${prod.nombre}`" v-model="prod.cantidad" type="number" @change="addCart(prod, `btn-${prod.nombre}`)")

    .reserve
      h1 Reserva
      Reserve(:reserva="cart")

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { StoreDB } from "../plugins/firebase";
import Reserve from "../components/reserve";
export default {
  components: {
    Reserve
  },
  data() {
    return {
      prodFilters: [],
      filters: ["desayuno", "almuerzo y cena"],
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

    return {
      breakfast: prodArray
    };
  },
  mounted() {
    this.filterType("desayuno");
  },
  methods: {
    ...mapActions('cart', ['SET_CART']),
    filterType(type) {
      this.prodFilters = this.breakfast.filter(prod => prod.subtipo === type);
    },
    addCart(item, id) {
      const verify = this.cart.some(el => el.nombre === item.nombre);
      if (verify) {
        const index = this.cart.findIndex(
          el => el.nombre === item.nombre
        );
        this.cart[index]["cantidad"] =
          parseInt(this.cart[index]["cantidad"]);
        // console.log(this.cart[index]["cantidad"], 'cantidad')
        this.cart[index]["subtotal"] =
          parseInt(this.cart[index]["cantidad"]) * parseInt(this.cart[index]["precio"]);

      } else {
        item.cantidad = 1;
        item.subtotal = item.precio * item.cantidad
        this.cart.push(item);
                // console.log(this.cart[0]["cantidad"], 'cantidad')

      }
      // console.log(verify, "soy item add cart");

      // item.subtotal = item.precio;
      // this.cart.push(item);
      // console.log(this.cart);
      // document.getElementById(id).disabled = true
    }
  },
  // watch: {
  //   'cart': {
  //     handler (newValue, oldValue) {
  //       console.log(newValue, oldValue, 'watch')
  //       // newValue.forEach((item) => {
  //       //   console.log('item watch', item)
  //       //   // item.cantidad = parseInt(parseInt(item.cantidad) + 1)
  //       //   item.subtotal = item.cantidad * item.precio
  //       // })
  //     },
  //     deep: true
  //   }
  // },
};
</script>

<style scoped>
.container-menu {
  width: 50%;
}
.card {
  width: 30%;
  margin: 5%;
}
.widthImg {
  height: 120px;
  width: 150px;
}
.reserve {
  width: 50%;
}
</style>
