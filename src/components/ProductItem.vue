<template>
	<div class="product__item">
	<b-card
	    :img-src="productObject.image"
	    img-top
	    tag="article"
	    style=""
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
			<b-button @click="addItemToCart(productObject)">Ajouter au panier</b-button>
		</p>
		<p>
			<b-button @click="addItemToWishList(productObject)" >Ajouter à la wishlist</b-button>
		</p>
	</b-card>
	</div>
</template>

<script>
import Cart from '../mixins/Cart';
import WishList from '../mixins/WishList';
export default {

  name: 'ProductItem',
  mixins:[Cart, WishList],
  props: {
        productObject: Object
  },
  methods: {
  	addItemToCart: function(product) {
  		this.addToCart(product)
  	},
	addItemToWishList: function(product){
	    this.addToWishList(product)
	},
	clearItemWishList: function(){
	    this.clearWishList()
	},
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
	width:15%;
    margin:10px;
}
</style>