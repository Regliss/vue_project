<template>
	<div class="page__account">
		<TitlePage title="Mon compte"/>
		<div v-if="isLogged">
			<div class="user__info" v-if="user">
				<p><b>Nom: </b>{{user.lastName}}</p>
				<p><b>Prénom: </b>{{user.firstName}}</p>
				<p><b>Adresse: </b>{{user.address}}</p>
				<p><b>Téléphone: </b>{{user.phone}}</p>
				<p><b>Mail: </b>{{user.email}}</p>
	  			<!-- <router-link :to="{name:'Product',params:{id:productObject._id}}"> -->
	  			<router-link :to="{name:'UpdateUser', params:{id:user._id}}">
	  				<b-button @click="">Modifier</b-button> 
	  			</router-link> |
	  			<b-button @click="logout">Se déconnecter</b-button>
	  			<p></p>
				<div v-if="user.isAdmin">
					<router-link to="/AddAdmin" custom v-slot="{ navigate }">
	      				<b-button @click="navigate" @keypress.enter="navigate" role="link">Ajouter un admin</b-button> 
	  				</router-link>
  				</div>
  				<!-- <div v-else>
					<b-button @click="logout">Se déconnecter</b-button>
				</div> -->
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
  		this.$router.push('login');
  	},
  	addAdmin: function() {
  		this.user.isAdmin = true;
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