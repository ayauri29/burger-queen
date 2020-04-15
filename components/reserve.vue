<template lang="pug">
  //- b-card(:header='`Orden N° ${num+1}`')
  div
    p ORDEN N° {{num + 1}}
    hr
    div(class="d-flex align-items-center justify-content-between")
      label Nombre:
      b-form-input(v-model="cliente")
    div(class="d-flex align-items-center justify-content-between mb-2")
      label Mesa:
      b-form-input(v-model="mesa")
    b-table(v-if="reserva.length > 0" :items="reservas" :fields="fields")
      //- template(v-slot:cell(cantidad)="data")
      //-   b-form-input(v-model="data.item.cantidad" type="number" @change="addQty(data.item)")
      //-@change="addQty(item)"
      //- template(v-slot:cell(cantidad)="data")
      //-   div.qty-minus(v-on:click="minusQty(data.item)") -
      //-     div.qty {{data.item.cantidad}}
      //-   div.qty-plus(v-on:click="plusQty(data.item)") +
      template(v-slot:cell(precio)="data")
        p S/. {{data.item.precio}}.00
      template(v-slot:cell(subtotal)="data")
        p S/. {{data.item.subtotal}}.00
    div.no-results(v-else)
      img(src="https://img.icons8.com/dusk/128/000000/hamburger.png")
      p Agrega los pedidos
    p(v-if="reserva.length > 0") Total: {{total}}
    p {{orders}}
    //- p {{orders.length}}
    b-button.btn-send(@click="sendOrder(reservas, cliente)") Enviar pedido a cocina


</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { StoreDB } from "../plugins/firebase";

export default {
  props: ["reserva", "num"],
  data() {
    return {
      fields: ["cantidad", "nombre", "precio", "subtotal"],
      cliente: ""
    };
  },
  computed: {
    ...mapGetters("cart", ["getCart"]),
    reservas() {
      const newArr = [...this.reserva];
      newArr.forEach(element => {
        const duplicated = newArr.filter(el => el.nombre === element.nombre);
        element.cantidad = duplicated.length;
        element.subtotal = element.cantidad * element.precio;
      });

      return this.getUniqueListBy(newArr, "nombre");
    },
    total() {
      return this.reserva.reduce(function(acc, obj) {
        return acc + obj.subtotal;
      }, 0);
    }
  },
  methods: {
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()];
    },
    addQty(item) {
      console.log(item, "it");
      // item.cantidad = parseInt(parseInt(item.cantidad) + 1)
      item.subtotal = item.cantidad * item.precio;
      // console.log(item, this.dataReserve, "item");
    },
    sendOrder(reservas, cliente) {
      console.log(reservas, cliente);
      StoreDB.collection("ordenes")
        .doc(`reserva${this.num + 1}`)
        .set({
          reservas: reservas,
          cliente: cliente,
          total: this.total,
          estado: "PENDIENTE",
          code: `reserva${this.num + 1}`
        })
        .then(function() {
          console.log("Document successfully written!");
        });
      // StoreDB.collection("ordenes")
      //   .add({
      //     reservas: reservas,
      //     cliente: cliente,
      //     total: this.total,
      //     estado: 'PENDIENTE'
      //   })
      //   .then(function (docRef) {
      //     console.log("Document written with ID: ", docRef.id);
      //   })
      //   .catch(function (error) {
      //     console.error("Error adding document: ", error);
      //   });
    }
  }
  // watch: {
  //   'reserva': {
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
.card {
  width: 100%;
}
.btn-send{
  background-color: #e41c43;
}
p:nth-child(1){
  margin: 0;
}
.form-control{
  width: 50%;
}
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
