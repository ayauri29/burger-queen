<template lang="pug">
  div
    //- p {{orderFiltered}}
    b-button(v-for="filter in filters" @click="getOrders(filter)") {{filter}}
    //- p {{orderNew}} orden
    //- p {{ord}} orrr
    p {{filter}}
    .reservations(class="d-flex")
      b-card(v-for="order in orders" :header="order.estado")
        b-table(responsive :items="order.reservas" :fields="fields")
          template(v-slot:cell(imagen)="data")
            img.style-img(:src="data.item.imagen")
        hr
        p {{order.total}}
        b-button(v-if="order.estado === 'PENDIENTE'" @click="updateState(order.code, 'LISTO')") Marcar como Listo
        b-button(v-if="order.estado === 'LISTO'" @click="updateState(order.code, 'ENTREGADO')") Marcar como Entregado

</template>

<script>
import { StoreDB } from "../../plugins/firebase";
export default {
  data() {
    return {
      fields: ["cantidad", "nombre", "precio", "subtotal"],
      filters: ["LISTO", "PENDIENTE", "ENTREGADO"],
      filter: '',
      orderFiltered: [],
      orders: [],
      orderNew: []
    };
  },
  created() {
    this.getOrders('PENDIENTE');
  },
  methods: {
    updateState(code, estado, preState) {
      const orderRef = StoreDB.collection("ordenes").doc(code);
      orderRef
        .update({
          estado: estado
        })
        .then(result => {
          this.getOrders(this.filter);
          console.log("Document successfully updated!", result);
          // this.getOrders();
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },
    getOrders(state) {
      this.filter = state
      StoreDB.collection("ordenes").where("estado", "==", state).onSnapshot(querySnapshot => {
        this.orders = []
        querySnapshot.forEach(doc => {
          this.orders.push(doc.data());
        });
      });
    },
  }
};
</script>
<style scoped>
.card {
  width: 40%;
}
.style-img {
  width: 50px;
}
.reservations{
  flex-wrap: wrap;
}
</style>
