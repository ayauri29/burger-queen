<template lang="pug">
  div
    p {{reserva}}
    b-table(:items="reserva" :fields="fields")
      template(v-slot:cell(cantidad)="{ item, value }")
        b-form-input(v-model="item.cantidad" type="number" @change="addQty(item)")
        p data {{item.cantidad}}
        p {{value}}
      //- template(v-slot:cell(subtotal)="data")
      //-   p {{data.item.s}}

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ["reserva"],
  data() {
    return {
      fields: ["cantidad", "nombre", "precio", "subtotal"],
      dataReserve: [],
      a: ''
    };
  },
  // computed: {
  //   reserved(){
  //     console.log(this.reserva)
  //     return this.reserva
  //   }
  // },
  updated() {
    console.log(this.reserva)
    this.dataReserve = this.reserva
  },
  computed: {
    ...mapGetters('cart', ['getCart']),
    reserves(){
      return this.getCart
    }
  },

  mounted() {
    // console.log(this.reserva);
    this.dataReserve = this.reserva
  },
  methods: {

    addQty(item) {
      // item.cantidad = parseInt(parseInt(item.cantidad) + 1)
      // item.subtotal = item.cantidad * item.precio
      console.log(item, this.dataReserve, 'item')
    }
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

<style></style>
