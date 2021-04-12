<template>
	<div class="update__account">
		<TitlePage title="Modifier mes informations"/>
		<div>
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
          <input type="submit"></input>
      </b-form>
      <p></p>
		</div>		
	</div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import TitlePage from "../components/TitlePage";
import Button from "../components/Button";
import apiConfigs from "../configs/api.configs";
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
      fetch(`${apiConfigs.apiUrl}/users/edit/${this.$route.params.id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // this.$router.push('/account');
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
  		fetch(`${apiConfigs.apiUrl}/users/${this.$route.params.id}`, {
  			headers: {
  				Authorization:token
  			}
  		})
      .then(res=>res.json())
      .then(data=>{
      console.log(data);
      this.lastName = data.lastName;
      this.firstName = data.firstName;
      this.address = data.address;
      this.phone = data.phone;
      // this.updateUser = data;
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