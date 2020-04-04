<template lang="pug">
  b-card(v-if="reserva.length > 0" header="Pedido")
    label Nombre:
      b-form-input(v-model="cliente")
    b-table(:items="reservas" :fields="fields")
      //- template(v-slot:cell(cantidad)="{ item, value }")
      //-   b-form-input(v-model="item.cantidad" type="number" @change="addQty(item)")
      template(v-slot:cell(precio)="data")
        p S/. {{data.item.precio}}.00
      template(v-slot:cell(subtotal)="data")
        p S/. {{data.item.subtotal}}.00

    p {{total}}


</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["reserva"],
  data() {
    return {
      fields: ["cantidad", "nombre", "precio", "subtotal"],
      dataReserve: [],
      cliente: "",
    };
  },
  updated() {
    console.log(this.reserva);
    this.dataReserve = this.reserva;
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

      return this.getUniqueListBy(newArr, 'nombre');
    },
    total() {
      return this.reserva.reduce(function (acc, obj) {
        return acc + obj.subtotal;
      }, 0);
    },
  },

  mounted() {
    // console.log(this.reserva);
    this.dataReserve = this.reserva;
  },
  methods: {
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    },
    addQty(item) {
      // item.cantidad = parseInt(parseInt(item.cantidad) + 1)
      // item.subtotal = item.cantidad * item.precio
      console.log(item, this.dataReserve, "item");
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
