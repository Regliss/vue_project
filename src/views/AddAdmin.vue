<template>
	<div class="signup__form">
		<form @submit.prevent="signup">
			<div class="form__group">
				<label htmlFor="firstName">Prénom :</label>
				<input type="firstName" name="firstName" v-model="firstName"/>
			</div>
			<div class="form__group">
				<label htmlFor="lastName">Nom :</label>
				<input type="lastName" name="lastName" v-model="lastName"/>
			</div>
			<div class="form__group">
				<label htmlFor="address">Addresse :</label>
				<input type="address" name="address" v-model="address"/>
			</div>
			<div class="form__group">
				<label htmlFor="phone">Téléphone :</label>
				<input type="phone" name="phone" v-model="phone"/>
			</div>
			<div class="form__group">
				<label htmlFor="email">Mail :</label>
				<input type="email" name="email" v-model="email"/>
			</div>
			<div class="form__group">
				<label htmlFor="password">Password :</label>
				<input type="password" name="password" v-model="password"/>
			</div>
			<div class="form__group">
				<label htmlFor="isAdmin">Admin :</label>
				<input type="checkbox" name="isAdmin" v-model="isAdmin"/>
			</div>
			<div class="form__group">
				<input type="submit" name="Créer">
			</div>
		</form>
		<p v-if="messageError">
			{{messageError}}
		</p>
	</div>
</template>

<script>
export default {

  name: 'AddAdmin',
  data: function() {
  	return {
  		firstName:"",
  		lastName:"",
  		address:"",
  		phone:"",
  		email:"",
  		password:"",
  		isAdmin:"",
  		messageError:""
  	}
  },
  methods:{
  	signup: function(e) {
  		const body = {
  			firstName: this.firstName,
  			lastName: this.lastName,
  			address: this.address,
  			phone: this.phone,
  			email: this.email,
  			password: this.password,
  			isAdmin: this.isAdmin
  		}
  		const requestOptions = {
  			method: "POST",
  			headers: {
  				"Content-Type":"application/json"
  			},
  			body: JSON.stringify(body)
  		}
  		fetch("http://localhost:3000/api/v1/users/add", requestOptions)
  		.then(response => response.json())
    	.then(data => {
    		if (!data.auth) {
    			this.messageError = data.message;
    		}
    		else {
    			// console.log(data);
    			// let token = data.token;
    			// localStorage.setItem('token', token);
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
</style>