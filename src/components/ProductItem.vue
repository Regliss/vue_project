<template>
	<div class="product__item">
	<b-card
	    :img-src="productObject.image"
	    img-top
	    tag="article"
	    style="max-width: 20rem;"
	    class="mb-2">
		<router-link :to="{name:'Product',params:{id:productObject._id}}">
			<h2>
				{{productObject.title}}
			</h2>
		</router-link>
		<p>
			{{productObject.price | formatPriceDecimal |formatPrice}}
		</p>
		<!-- <p><img :src="productObject.image"></p> -->
		<p>
			<button @click="addItemToCart(productObject)">Ajouter au panier</button>
		</p>
	</b-card>
	</div>
</template>

<script>
import Cart from '../mixins/Cart';
export default {

  name: 'ProductItem',
  mixins:[Cart],
  props: {
        productObject: Object
  },
  methods: {
  	addItemToCart: function(product) {
  		this.addToCart(product)
  	}
  },
  filters:{
  	formatPriceDecimal: function(value) {
  		return value.toFixed(2);
  	}
  },
}
</script>

<style lang="css" scoped>
.product__item {
	width:50%;
    margin:10px auto;
}
</style>