<template lang="pug">
  div
    b-card(v-for="order in orders")
      b-table(:items="order.reservas")

</template>

<script>
import { StoreDB } from "../plugins/firebase";
export default {
  async asyncData() {
    let prodArray = [];
    await StoreDB.collection("ordenes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          prodArray.push(doc.data());
        });
      });
    return {
      orders: prodArray,
    };
  },
}
</script>
