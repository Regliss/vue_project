<template>
	<div class="product__item">
		<router-link :to="{name:'Product',params:{id:productObject._id}}">
			<h2>
				{{productObject.title}}
			</h2>
		</router-link>
		<p>
			{{productObject.price | formatPriceDecimal |formatPrice}}
		</p>
	</div>
</template>

<script>
export default {

  name: 'ProductItem',
  props: {
        productObject: Object
  },
  filters:{
  	formatPriceDecimal: function(value) {
  		return value.toFixed(2);
  	}
  },
}
</script>

<style lang="css" scoped>
</style>