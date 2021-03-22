<template>
	<div>
		<div class="products__grid">
	  		<ProductItem v-for="product in productsArray" :key="product._id" :productObject="product"/>
  		</div>
	</div>
</template>

<script>
import ProductItem from "../components/ProductItem";
export default {

  name: 'ProductsGrid',
  components: {
  	ProductItem
  },
  props: {
        productsArray: Array
  },
  // data () {
  //   return {

  //   }
  // }
}
</script>

<style lang="css" scoped>
.products__grid {
  display: flex;
  align-items: center;
  justify-content : center;
  
}
</style>