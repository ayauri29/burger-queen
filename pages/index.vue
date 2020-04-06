<template>
  <div class="container">
    <div class="flex">
      <h1 class="title">
        BURGER QUEEN APP
      </h1>
      <!-- <p>
        Sistema diseñado con doble funcion que permite tomar los pedidos de los
        clientes y enviar los pedidos a una interfaz para ser atendida por los
        cocineros. Es una solucion funcional y flexible para administrar los
        pedidos de los usuarios.
      </p> -->
      <div class="d-flex buttons">
        <b-button class="btn-start">
          <nuxt-link to="kitchen">COCINERO</nuxt-link>
        </b-button>
        <b-button class="btn-start">
          <nuxt-link to="menu">MESERO</nuxt-link>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  layout: "without",
  components: {
    Logo
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Be+Vietnam&display=swap");
* {
  font-family: "Be Vietnam", sans-serif;
}
.container {
  background-image: url("../assets/background/hamburguesa.jpg");
  background-size: cover;
  margin: 0;
  min-height: 100vh;
  min-width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}
.title {
  display: block;
  font-weight: 500;
  font-size: 46px;
  color: white;
  letter-spacing: 1px;
  margin-bottom: 12%;
}
.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  padding: 2%;
}

.buttons {
  width: 100%;
  justify-content: center;
  justify-content: space-evenly;
}

.btn-start {
  align-self: center;
  background-color: #ffc107;
  /* font-size: 20px;
  padding: 2% 4%; */
}
.btn-start:hover {
  background-color: #d39e00;
}
</style>
