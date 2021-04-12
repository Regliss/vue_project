<template>
	<div class="update__product">
		<TitlePage title="Modifier le produit"/>
		<div>
      <b-form @submit.prevent="update">
        <b-form-group>
          <label htmlFor="title">Titre :</label>
          <b-input name="title" v-model="title"/>
        </b-form-group>
        <b-form-group>
          <label htmlFor="price">Prix :</label>
          <b-input name="price" v-model="price"/>
        </b-form-group>
		<b-form-group>
          <label htmlFor="description">Description :</label>
          <b-input name="description" v-model="description"/>
        </b-form-group>
		<b-form-group>
          <label htmlFor="image">Image :</label>
          <b-input name="image" v-model="image"/>
        </b-form-group>
		<b-form-group>
          <input type="submit"></input>
        </b-form-group>
      </b-form>
      <p></p>
		</div>		
	</div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import TitlePage from "../components/TitlePage";
import apiConfigs from "../configs/api.configs";
export default {
  name: 'UpdateUser',
  components: {
  	TitlePage
  },
  data: function() {
  	return {
      updateProduct:{},
      title:"",
      price:"",
      description:"",
      image:""
    }
  },
  methods: {
    update: function() {
      const token = localStorage.getItem('token');
      console.log(this.title);
      const body = {
        title: this.title,
        price: this.price,
        description: this.description,
        image: this.image
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
      fetch(`${apiConfigs.apiUrl}/products/edit/${this.$route.params.id}`, requestOptions)
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
  		fetch(`${apiConfigs.apiUrl}/products/${this.$route.params.id}`, {
  			headers: {
  				Authorization:token
  			}
  		})
  		.then(res=>res.json())
      .then(data=>{
      this.title = data.title;
      this.price = data.price;
      this.description = data.description;
      this.image = data.image;
      this.updateProduct = data;
      })
    .then(err=>console.log(err));
  	}
  }
}
</script>

<style lang="css" scoped>
.update__product {
        font-family: 16px;
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }
</style>