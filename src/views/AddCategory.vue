<template>
	<div class="category__form">
		<TitlePage title="Ajout Category"/>
        <form  @submit.prevent="addCategory" class="form">
            <label htmlFor="title">Titre :</label>
            <input type="text" v-model="title" />
            <button type="submit" class="button" >Créer</button>
        </form>
	</div>
</template>
<script>
import TitlePage from "../components/TitlePage";
  
  export default {
    name: 'AddCategory',
    data: function() {
        return {
            title:""
        }
    },
    components: {
      TitlePage
    },
    methods: {
      addCategory: function(e) {
          const body = {
              title: this.title,
          }
          const bodyToSend = JSON.stringify(body);
          const requestOptions = {
              method: "POST",
              headers: {
                  "Content-Type":"application/json"
              },
              body: bodyToSend
          }
          fetch("http://localhost:3000/api/v1/categoryz", requestOptions)
          .then(res=>res.json())
          .then(data=> console.log(data))
          .catch(err=>console.log(err))
      }
    },
  }
  
</script>


<style lang="scss" scoped>
    .category__form {
        font-family: 16px;
        margin: 0 auto;
        max-width: 600px;
        width: 100%;
    }

    .category__form .separator {
        border-bottom: solid 1px #ccc;
        margin-bottom: 15px;
    }

    .category__form .form {
        display: flex;
        flex-direction: column;
        font-size: 16px;
        
    }

    .category__form input[type="text"] {
        border: solid 1px #e8e8e8;
        font-family: 'Roboto', sans-serif;
        padding: 10px 7px;
        margin-bottom: 15px;
        outline: none;
    }

    .category__form .button {
        background: green;
        border: solid 1px green;
        color: white;
        cursor: pointer;
        padding: 10px 50px;
        text-align: center;
        text-transform: uppercase;
    }

    .category__form .button:hover {
        background: darkgreen;
        border: solid 1px darkgreen;
    }

    .category__form input[type="text"],
    .category__form .button {
        font-size: 15px;
        border-radius: 3px;
  
    }
</style>