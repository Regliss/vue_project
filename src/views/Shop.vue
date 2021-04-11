<template>
	<div class="page__shop">
		<TitlePage title="Mon Eshop"/>
    <div class="search__form">
      <input type="text" v-model="searchValue" @keyup="search"/>
    </div>
    <!-- <div class="input__content">
      Résultat de votre recherche = {{searchValue}}
    </div>
      Ancienne recherche = {{oldSearchValue}} -->
		<ProductsGrid :productsArray="filteredShop" />
  <router-link to="/addProduct" custom v-slot="{ navigate }">
      <button @click="navigate" @keypress.enter="navigate" role="link">Ajouter un produit</button>
  </router-link>
  </div>
</template>

<script>
import TitlePage from "../components/TitlePage";
import ProductsGrid from "../components/ProductsGrid";
import ApiProductsCrud from "../mixins/ApiProductsCrud";
export default {

  name: 'Shop',
  components: {
  	TitlePage,
  	ProductsGrid
  },
  data: function() {
  	return {
  		productsFromApi:[],
      searchValue:"",
      oldSearchValue:""
  	}
  },
  methods: {
    search: function() {
      // console.log(this.searchValue);
    }
  },
  computed: {
    filteredShop: function() {
      let filter = new RegExp(this.searchValue, "i");
      return this.productsFromApi.filter(item=>item.title.match(filter));
    }
  },
  watch: {
    searchValue: function(newValue, oldValue) {
      this.oldSearchValue = oldValue;
    }
  },
  mixins: [ApiProductsCrud],
  created() {
  	this.getProducts()
    .then(data => {
      console.log(data);
      this.productsFromApi = data;
    })
    .catch(err => console.log(err));
  }
}
</script>

<style lang="css" scoped>
</style>