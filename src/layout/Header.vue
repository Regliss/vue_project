<template>
	<header class="header__main">
		<div class="header__logo">
			<img src="../assets/logo.png" alt="My App Vue">
		</div>
		<div class="header__nav">
      		<!-- <router-link to="/">Home</router-link> |
      		<router-link to="/about">About</router-link> | -->
          <router-link to="/">Shop</router-link> |
          <router-link to="/account">Profil</router-link> |
          <router-link to="/login">Login</router-link>  |
          <router-link to="/cart">Mon panier</router-link> |
          <router-link to="/wishList">WishList</router-link>
          <div v-if="user.isAdmin">
          <router-link v-if="user.isAdmin" to="/usersCRUD">Users CRUD</router-link> |
          <router-link to="/productsCRUD">Produits CRUD</router-link> |
          <router-link to="/categoryzCRUD">Catégories CRUD</router-link> |
          <router-link to="/ordersCRUD">Commandes CRUD</router-link> |
          </div>
    	</div>
	</header>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode';
import apiConfigs from "../configs/api.configs";
export default {

  name: 'Header',

  data () {
    return {
      user:[],
    }
  },
  methods: {
    isAdmin: function() {
      this.user.isAdmin = true;
    }
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodeToken = VueJwtDecode.decode(token);
      fetch(`${apiConfigs.apiUrl}/users/${decodeToken.id}`, {
        headers: {
          Authorization:token
        }
      })
      .then(res => res.json())
      .then(data => {
        // this.isLogged = true;
        this.user = data;
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="css" scoped>
</style>