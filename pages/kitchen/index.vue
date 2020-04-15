<template lang="pug">
  div
    //- p {{orderFiltered}}
    div.group
      b-button-group.btn-group-class(id="btn-group" size="sm")
        b-button.btnLg.active(@click="getOrders('PENDIENTE')") PENDIENTE
        b-button.btnLg(@click="getOrders('LISTO')") LISTO
        b-button.btnLg(@click="getOrders('ENTREGADO')") ENTREGADO
    //- b-button(v-for="filter in filters" @click="getOrders(filter)") {{filter}}
    //- p {{orderNew}} orden
    //- p {{ord}} orrr
    //- p {{filter}}

    .reservations(v-if="orders.length > 0" class="d-flex")
      b-card(v-for="order in orders" :header="order.estado")
        b-table(responsive :items="order.reservas" :fields="fields")
          template(v-slot:cell(imagen)="data")
            img.style-img(:src="data.item.imagen")
        hr
        div.total(class="d-flex")
          p Total:
          b-input-group(size="sm" prepend="$" append=".00")
            b-form-input(v-model="order.total")
        //- p {{order.total}}
        b-button(v-if="order.estado === 'PENDIENTE'" @click="updateState(order.code, 'LISTO')") Marcar como Listo
        b-button(v-if="order.estado === 'LISTO'" @click="updateState(order.code, 'ENTREGADO')") Marcar como Entregado
    //- div(v-else)
    //-   div(class="text-center")
    //-     b-spinner(style="width: 3rem; height: 3rem; background-color:#7b2ded;" label="Large Spinner" type="grow")

    div.no-results(v-if="orders.length === 0")
      img(src="https://img.icons8.com/dusk/128/000000/hamburger.png")
      p No se encontraron órdenes con estado {{filter}}
</template>

<script>
import { StoreDB } from "../../plugins/firebase";
export default {
  data() {
    return {
      fields: ["cantidad", "nombre", "precio", "subtotal"],
      filters: ["LISTO", "PENDIENTE", "ENTREGADO"],
      filter: "",
      orderFiltered: [],
      orders: [],
      orderNew: []
    };
  },
  created() {
    this.getOrders("PENDIENTE");
  },
  updated() {
    var header = document.getElementById("btn-group");
    var btns = header.getElementsByClassName("btnLg");
    // console.log(btns)
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
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
      this.filter = state;
      StoreDB.collection("ordenes")
        .where("estado", "==", state)
        .onSnapshot(querySnapshot => {
          this.orders = [];
          querySnapshot.forEach(doc => {
            this.orders.push(doc.data());
          });
        });
    }
  }
};
</script>
<style scoped>
.card {
  width: 40%;
  margin-bottom: 2%;
}
.style-img {
  width: 50px;
}
.reservations {
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 4%;
}
.group {
  margin: 2% 7%;
}
.btn-group-class {
  display: flex;
  height: 7vh;
}
.btnLg {
  background-color: white;
  color: black;
  border: 1px solid #e41c43;
}
.btnLg:focus {
  background-color: #e41c43;
  color: white;
  border: 1px solid #e41c43;
}
.btnLg:hover {
  background-color: #e41c43;
  color: white;
  border: 1px solid #e41c43;
}
.active {
  background-color: #e41c43 !important;
  color: white;
  border: 1px solid #e41c43;
}
.card-header {
  background-color: #ffeeba;
  font-size: bold;
}
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.total {
  justify-content: space-between;
  align-items: baseline;
}
</style>
