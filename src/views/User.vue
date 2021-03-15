<template>
	<div class="page__account">
		<TitlePage title="Mon compte"/>
		<div v-if="isLogged">
			<div class="user__info" v-if="user">
				<p>Nom :{{user.firstName}}</p>
				<p>Prénom :{{user.lastName}}</p>
				<p>Mail :{{user.email}}</p>
				<router-link to="/AddAdmin" custom v-slot="{ navigate }">
      				<button @click="navigate" @keypress.enter="navigate" role="link">Ajouter un admin</button>
  				</router-link> | 
				<button @click="logout">Se déconnecter</button>
			</div>
		</div>
		<div v-else>
			<p>Vous n'êtes pas connecté</p>
		</div>
		
	</div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import TitlePage from "../components/TitlePage";
import Button from "../components/Button";
export default {

  name: 'User',
  components: {
  	TitlePage,
  	Button
  },
  data: function() {
  	return {
  		user:[],
  		isLogged: false
  	}
  },
  methods: {
  	logout: function() {
  		localStorage.removeItem('token');
  		this.isLogged = false;
  	}
  },
  created() {
  	const token = localStorage.getItem('token');
  	if (token) {
  		const decodeToken = VueJwtDecode.decode(token);
  		fetch(`http://localhost:3000/api/v1/users/${decodeToken.id}`, {
  			headers: {
  				Authorization:token
  			}
  		})
  		.then(res => res.json())
  		.then(data => {
  			this.isLogged = true;
  			this.user = data;
  		})
  		.catch(err => console.log(err))
  	}
  }
}
</script>

<style lang="css" scoped>
</style>