<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/menu">MENÚ</b-nav-item>
          <b-nav-item href="/kitchen">COCINA</b-nav-item>
        </b-navbar-nav>

        <!-- <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>

            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown> -->
        <!-- </b-navbar-nav> -->
      </b-collapse>

      <!-- <nuxt-link to="/">HOME</nuxt-link>
      <nuxt-link to="kitchen">MENÚ</nuxt-link>
      <nuxt-link to="kitchen">COCINA</nuxt-link> -->
    </b-navbar>

    <nuxt />
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";
export default {
  mounted() {
    // this.setupFirebase()
  },
  data() {
    return {
      loggedIn: false
    };
  },
  methods: {
    // logout(){
    //   firebase.auth().signOut().then(()=>{
    //     this.$router.push("/")
    //   })
    // },
    // setupFirebase(){
    //   firebase.auth().onAuthStateChanged(user=>{
    //     if(user){
    //       this.loggedIn = true
    //       firebase.auth().currentUser.getIdToken(true)
    //         .then(token => {
    //           Cookies.set('access_token', token)
    //         })
    //     } else {
    //       this.loggedIn = false
    //       Cookies.remove('access_token')
    //     }
    //   })
    // }
  }
};
</script>
<style>
.logout-link {
  cursor: pointer;
  text-decoration: underline;
}
.main {
  background-color: #e41c43;
  /* margin: 20px; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 12vh;
}
.main-links {
  width: 30%;
  margin: 10px 20px;
  display: flex;
  justify-content: space-around;
  color: white;
}
a {
  color: white;
  text-decoration: none;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.bg-info {
  background-color: #e41c43 !important;
  height: 10vh;
}
.navbar-expand-lg .navbar-collapse {
  display: flex !important;
  flex-basis: auto;
  justify-content: flex-end;
}
</style>
