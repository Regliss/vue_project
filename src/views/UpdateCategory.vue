<template>
	<div class="update__category">
		<TitlePage title="Modifier catégorie"/>
		<div>
      <b-form @submit.prevent="update">
        <b-form-group>
          <label htmlFor="title">Titre :</label>
          <b-input name="title" v-model="title"/>
        </b-form-group>
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
  name: 'UpdateCategory',
  components: {
  	TitlePage
  },
  data: function() {
  	return {
      updateCategory:{},
      title:"",
    }
  },
  methods: {
    update: function() {
      console.log(this.title);
      const body = {
        title: this.title,
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
      }
        console.log(JSON.stringify(body));
      fetch(`${apiConfigs.apiUrl}/categoryz/edit/${this.$route.params.id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.$router.push('/categoryzCRUD');
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
  		fetch(`${apiConfigs.apiUrl}/categoryz/${this.$route.params.id}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(this.$route.params.id);
        console.log(this.title);
      this.title = data.title;
      })
    .then(err=>console.log(err));
  	}
}
</script>

<style lang="css" scoped>
.update__category {
        font-family: 16px;
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }
</style>