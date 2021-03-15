<template>
	<div class="product__content" v-if="productItem">
		<TitlePage :title="productItem.title"/>
		<p>
			{{productItem.price | formatPriceDecimal |formatPrice}}
		</p>
    <p><img :src="productItem.image"></p>
	</div>
</template>

<script>
import TitlePage from "../components/TitlePage";
export default {

  name: 'Product',
  components:{
  	TitlePage
  },
  data: function() {
  	return {
  		productItem:{}
  	}
  },
  filters:{
  	formatPriceDecimal: function(value) {
  		return value.toFixed(2);
  	}
  },
  created() {
  	fetch(`http://localhost:3000/api/v1/products/${this.$route.params.id}`)
  	.then(res=>res.json())
  	.then(data=>{
  		this.productItem = data;
  		})
  	.then(err=>console.log(err));
  }
}
</script>

<style lang="css" scoped>
</style>