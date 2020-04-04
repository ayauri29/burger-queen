<template lang="pug">
  b-card(v-if="reserva.length > 0" header="Pedido")
    label Nombre:
      b-form-input(v-model="cliente")
    b-table(:items="reservas" :fields="fields")
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

    p {{total}}
    b-button(@click="sendOrder(reservas, cliente)") Enviar pedido


</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { StoreDB } from "../plugins/firebase";
export default {
  props: ["reserva"],
  data() {
    return {
      fields: ["cantidad", "nombre", "precio", "subtotal"],
      cliente: "",
    };
  },
  computed: {
    ...mapGetters("cart", ["getCart"]),
    reservas() {
      const newArr = [...this.reserva];
      newArr.forEach((element) => {
        const duplicated = newArr.filter((el) => el.nombre === element.nombre);
        element.cantidad = duplicated.length;
        element.subtotal = element.cantidad * element.precio;
      });

      return this.getUniqueListBy(newArr, "nombre");
    },
    total() {
      return this.reserva.reduce(function (acc, obj) {
        return acc + obj.subtotal;
      }, 0);
    },
  },
  methods: {
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    },
    addQty(item) {
      console.log(item, 'it')
      // item.cantidad = parseInt(parseInt(item.cantidad) + 1)
      item.subtotal = item.cantidad * item.precio
      // console.log(item, this.dataReserve, "item");
    },
    sendOrder(reservas, cliente) {
      console.log(reservas,cliente)
      StoreDB.collection("ordenes")
        .add({
          reservas: reservas,
          cliente: cliente,
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
  },
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
</style>
