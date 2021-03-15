<template>
  <div class="addProduct__form">

    <TitlePage title="Ajouter un Produit" /> 

    <form @submit.prevent="addProduct">
        <p>
        <label htmlFor="title">Titre: </label>
        <input type="text" v-model="title" name="title">
        </p>
        <p>
        <label htmlFor="price">Prix: </label>
        <input type="text" v-model="price" name="price"> €
        </p>
        <p>
        <label htmlFor="description">Description: </label>
        <input type="text" v-model="description" name="description">
        </p>
        <p>
        <label htmlFor="image">URL image: </label>
        <input type="text" v-model="image" name="image">
        </p>
        <p>
        <select v-model="category">
            <option disabled value="">Catégorie</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        </p>
        <br>     
        <input value="Ajouter" type="submit">
    </form>
    <p v-if="msgErr">
        {{msgErr}}
    </p>

  </div>
</template>

<script>

import TitlePage from "../components/TitlePage";
  
  export default {
    name: 'Signup',
    data: function() {
        return {
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
          fetch("http://localhost:3000/api/v1/product", requestOptions)
          .then(res=>res.json())
          .then(data=> console.log(data))
          .catch(err=>console.log(err))
      }
    },
  }
  
</script>


<style lang="scss" scoped>



</style>