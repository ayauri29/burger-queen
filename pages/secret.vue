<template lang="pug">
  div
    h1 Página secreta
</template>

<script>
import {getUserFromCookie} from '../helpers/index'
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req)
      if(!user){
        console.log(user)
        redirect('/login')
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/login");
      }
    }
    // let user = firebase.auth().currentUser
    // if(!user) {
    //   this.$router.push('/login')
    // }
  }
};
</script>

<style></style>
