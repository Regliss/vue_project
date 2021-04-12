<template>
  <div class="addProduct__form">

    <TitlePage title="Ajouter un Produit" /> 

    <b-form @submit.prevent="addProduct">
      <b-form-group>
        <label htmlFor="title">Titre: </label>
        <b-input type="text" v-model="title" name="title"/>
      </b-form-group>
      <b-form-group>
        <label htmlFor="price">Prix: </label>
        <b-input type="text" v-model="price" name="price"/> €
      </b-form-group>
      <b-form-group>
        <label htmlFor="description">Description: </label>
        <b-input type="text" v-model="description" name="description"/>
      </b-form-group>
      <b-form-group>
        <label htmlFor="image">URL image: </label>
        <b-input type="text" v-model="image" name="image"/>
      </b-form-group>

      <b-form-group>
        <label for="category">Categorie</label>
        <b-select name="category" v-model="category">
            <!-- <option disabled value="">Catégorie</option> -->
            <option v-for="category in categoryzFromApi" v-bind:key="category._id" value="category._id">{{category.title}}</option>
            <!-- <option>B</option> -->
            <!-- <option>C</option> -->
        </b-select>
      </b-form-group>

        <br>     
        <input value="Ajouter" type="submit">
    </b-form>
    <p v-if="msgErr">
        {{msgErr}}
    </p>

  </div>
</template>

<script>

import TitlePage from "../components/TitlePage";
import ApiCategoryzCrud from "../mixins/ApiCategoryzCrud";
import apiConfigs from "../configs/api.configs";  
  export default {
    name: 'AddProduct',
    data: function() {
        return {
            categoryzFromApi: [],
            title:"",
            price:"",
            description:"",
            image:"",
            category:"",
            msgErr:""
        }
    },
    components: {
      TitlePage
    },
    mixins: [ApiCategoryzCrud],
    created() {
    this.getCategoryz()
      .then((data) => {
        console.log(data);
        this.categoryzFromApi = data;
      })
      .catch(err => console.log(err));
    },
    methods: {
      addProduct: function(e) {
          const body = {
              title: this.title,
              price: this.price,
              description: this.description,
              image: this.image,
              category: this.category
          }
           console.log(body)
          const bodyToSend = JSON.stringify(body);
            console.log(bodyToSend)
          const requestOptions = {
              method: "POST",
              headers: {
                  "Content-Type":"application/json"
              },
              body: bodyToSend
          }
             console.log(bodyToSend)
          fetch(`${apiConfigs.apiUrl}/product`, requestOptions)
          .then(res=>res.json())
          .then(data=> console.log(data))
          .catch(err=>console.log(err))
      }
    },
  }
  
</script>


<style lang="scss" scoped>
.addProduct__form {
        font-family: 16px;
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }


</style>