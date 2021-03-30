<template>
	<div class="signup__form">
		<b-form-simple @submit.prevent="signup">
			<div class="form__group">
				<label htmlFor="lastName">Nom :</label>
				<b-input type="lastName" name="lastName" v-model="lastName"/>
			</div>
			<div class="form__group">
				<label htmlFor="firstName">Prénom :</label>
				<b-input type="firstName" name="firstName" v-model="firstName"/>
			</div>
			<div class="form__group">
				<label htmlFor="address">Addresse :</label>
				<b-input type="address" name="address" v-model="address"/>
			</div>
			<div class="form__group">
				<label htmlFor="phone">Téléphone :</label>
				<b-input type="phone" name="phone" v-model="phone"/>
			</div>
			<div class="form__group">
				<label htmlFor="email">Mail :</label>
				<b-input type="email" name="email" v-model="email"/>
			</div>
			<div class="form__group">
				<label htmlFor="password">Password :</label>
				<b-input type="password" name="password" v-model="password"/>
			</div>
			<div class="form__group">
				<label htmlFor="isAdmin">Admin :</label>
				<input type="checkbox" name="isAdmin" v-model="isAdmin"/>
			</div>
			<!-- <div class="form__group">
				<b-input type="submit" name="Créer">Créer</b-input>
			</div> -->
		</b-form-simple>
		<p></p>
		<router-link to="/login">
			<b-button>Connexion</b-button>
  		</router-link>
		<p v-if="messageError">
			{{messageError}}
		</p>
	</div>
</template>

<script>
export default {

  name: 'Signup',
  data: function() {
  	return {
  		firstName:"",
  		lastName:"",
  		address:"",
  		phone:"",
  		email:"",
  		password:"",
  		messageError:""
  	}
  },
  methods:{
  	signup: function() {
  		const body = {
  			firstName: this.firstName,
  			lastName: this.lastName,
  			address: this.address,
  			phone: this.phone,
  			email: this.email,
  			password: this.password,
  			isAdmin: false,
  		}
  		const requestOptions = {
  			method: "POST",
  			headers: {
  				"Content-Type":"application/json"
  			},
  			body: JSON.stringify(body)
  		}
  		fetch("http://localhost:3000/api/v1/users", requestOptions)
  		.then(response => response.json())
    	.then(data => {
    		console.log(data);
    		if (!data.auth) {
    			this.messageError = data.message;
    		}
    		else {
    			// console.log(data);
    			let token = data.token;
    			localStorage.setItem('token', token);
    			this.$router.push('/account');
    		}
    	})
    	.catch(err => {
    		console.log(err)
    	})
  	}
  }
}
</script>

<style lang="css" scoped>
.signup__form {
        font-family: 16px;
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }
</style>