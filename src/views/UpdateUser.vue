<template>
	<div class="update__account">
		<TitlePage title="Modifier mes informations"/>
		<div>
			<!-- <div class="user__info" v-if="updateUser"> -->
      <b-form @submit.prevent="update">
        <b-form-group>
          <label htmlFor="lastName">Nom :</label>
          <b-input name="lastName" v-model="lastName"/>
        </b-form-group>
        <b-form-group>
          <label htmlFor="firstName">Prénom :</label>
          <b-input name="firstName" v-model="firstName"/>
        </b-form-group>
				<b-form-group>
          <label htmlFor="address">Adresse :</label>
          <b-input name="address" v-model="address"/>
        </b-form-group>
				<b-form-group>
          <label htmlFor="phone">Téléphone :</label>
          <b-input name="phone" v-model="phone"/>
        </b-form-group>
        <!-- <router-link to="/account"> -->
          <input type="submit"></input>
        <!-- </router-link> -->
      </b-form>
      <p></p>
		</div>		
	</div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import TitlePage from "../components/TitlePage";
import Button from "../components/Button";
export default {
  name: 'UpdateUser',
  components: {
  	TitlePage,
  	Button
  },
  data: function() {
  	return {
      updateUser:{},
      firstName:"",
      lastName:"",
      address:"",
      phone:"",
      email:"",
      password:"",
      messageError:""
    }
  },
  methods: {
    update: function() {
      const token = localStorage.getItem('token');
      console.log(this.firstName);
      const body = {
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        phone: this.phone,
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
        console.log(JSON.stringify(body));
      const decodeToken = VueJwtDecode.decode(token);
      fetch(`http://localhost:3000/api/v1/users/edit/${decodeToken.id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (!data.auth) {
          this.messageError = data.message;
        }
        else {
          console.log(data);
          let token = data.token;
          localStorage.setItem('token', token);
          // this.$router.push('/account');
        }
      })
      .catch(err => {
        console.log(err)
      })
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
  		.then(res=>res.json())
      .then(data=>{
      this.lasttName = data.lastName;
      this.firstName = data.firstName;
      this.adress = data.address;
      this.phone = data.phone;
      this.updateUser = data;
      })
    .then(err=>console.log(err));
  	}
  }
}
</script>

<style lang="css" scoped>
.update__account {
        font-family: 16px;
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }
</style>