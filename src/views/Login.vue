<template>
	<div class="login__form">
		<form @submit.prevent="login">
			<div class="form__group">
				<label htmlFor="email">Mail :</label>
				<input type="email" name="email" v-model="email"/>
			</div>
			<div class="form__group">
				<label htmlFor="password">Password :</label>
				<input type="password" name="password" v-model="password"/>
			</div>
			<div class="form__group">
				<input type="submit" name="se connecter">
			</div>
		</form>
		<p v-if="messageError">
			{{messageError}}
		</p>
	</div>
</template>

<script>
export default {

  name: 'Login',
  data: function() {
  	return {
  		email:"",
  		password:"",
  		messageError:""
  	}
  },
  methods:{
  	login: function(e) {
  		const body = {
  			email: this.email,
  			password: this.password
  		}
  		const requestOptions = {
  			method: "POST",
  			headers: {
  				"Content-Type":"application/json"
  			},
  			body: JSON.stringify(body)
  		}
  		fetch("http://localhost:3000/api/v1/users/login", requestOptions)
  		.then(response => response.json())
    	.then(data => {
    		if (!data.auth) {
    			this.messageError = data.message;
    		}
    		else {
    			console.log(data);
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
</style>