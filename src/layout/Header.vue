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
          <router-link to="/usersCRUD">Users CRUD</router-link> |
          <router-link to="/productsCRUD">Produits CRUD</router-link> |
          <router-link to="/categoryzCRUD">Catégories CRUD</router-link> |
          <router-link to="/cart">Mon panier</router-link> |
          <router-link to="/wishList">WishList</router-link>
    	</div>
	</header>
</template>
<script>
export default {

  name: 'Header',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>