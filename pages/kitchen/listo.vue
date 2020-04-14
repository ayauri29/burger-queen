<template lang="pug">
  div
    //- p {{orderFiltered}}
    b-button(v-for="filter in filters" @click="filtered(filter)") {{filter}}
    //- p {{orderNew}} orden
    //- p {{ord}} orrr
    b-card(v-for="order in orderFiltered" :header="order.estado")
      b-table(:items="order.reservas" :fields="fields")
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
      orderFiltered: [],
      // orders: [],
      orderNew: []
    };
  },
  async asyncData() {
    let orderArray = [];
    await StoreDB.collection("ordenes").where("estado", "==", "LISTO")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          orderArray.push(doc.data());
        });
      });
    return {
      orders: orderArray
    };
  },
  // firestore() {
  //   return {
  //     ordersNew: StoreDB.collection("ordenes")
  //   };
  // },
  // computed: {
  //   ord() {
  //     let arr = [];
  //     this.orderN = [];
  //     StoreDB.collection("ordenes").onSnapshot(querySnapshot => {
  //       querySnapshot.forEach(doc => {
  //         arr.push(doc.data());
  //       });
  //       this.orderN = arr;
  //       // console.log(this.orderN)
  //     });
  //     return arr;
  //     // const a = arr
  //     //      console.log(a, 'a')
  //     // return arr
  //   }
  // },
  created() {
    // this.getOrders();
    this.filtered("PENDIENTE");
  },
  methods: {
    updateState(code, estado, preState) {
      const orderRef = StoreDB.collection("ordenes").doc(code);
      orderRef
        .update({
          estado: estado
        })
        .then(result => {
          console.log("Document successfully updated!", result);
          // this.getOrders();
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },
    getOrders() {
      let orderArray = [];
      // this.orders=[]
      StoreDB.collection("ordenes").onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          orderArray.push(doc.data());
        });
      });
      this.orders = orderArray;
    },
    filtered(estado) {
      console.log(estado);
      this.orderFiltered = this.orders.filter(el => el.estado === estado);
      console.log(this.orders, this.orderFiltered);
    }
  }
};
</script>
<style scoped>
.card {
  width: 10%;
}
.style-img {
  width: 50px;
}
</style>
