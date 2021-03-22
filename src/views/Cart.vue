<template>
	<div class="shopping__cart">
		<!-- loop sur this.cartArray -->
		<b-table-simple bordered class="shop__table" >
			<b-thead>
				<b-tr>
					<b-th>Titre</b-th>
					<b-th>Image</b-th>
					<b-th>Quantity</b-th>
					<b-th>Price</b-th>
					<b-th></b-th>
					<b-th></b-th>
					<b-th>Total</b-th>
					<b-th>Action</b-th>
				</b-tr>
			</b-thead>
			<b-tbody>
				<b-tr v-for="item in cartArray" :key="item.id">
					<b-td>{{ item.title }}</b-td>
					<b-td><img :src="item.image" style="max-width: 5rem;"></b-td>
					<b-td>{{ item.qty }}</b-td>
					<b-td>{{ item.price | formatPriceDecimal |formatPrice}}</b-td>
					<b-td>
						<b-button @click="deleteItemCart(item)">-</b-button>
					</b-td>
					<b-td><b-button @click="addItemCart(item)">+</b-button></b-td>
					<b-td>
						{{item.qty * item.price | formatPriceDecimal |formatPrice}}
					</b-td>
					<b-td>
						<b-button variant="danger" @click="removeProductCart(item)">Supprimer le produit</b-button>
					</b-td>
				</b-tr>
			</b-tbody>
		</b-table-simple>
		<div>
			Quantité Totale : {{calcQty}}
		</div>
		<div>
			Prix Totale : {{calcTotal | formatPriceDecimal |formatPrice}}
		</div>
		<b-button variant="danger" @click="clearShopCart()">Supprimer le panier</b-button>
	</div>
</template>

<script>
import Cart from "../mixins/Cart";
export default {

  name: 'Cart',
  mixins:[Cart],

  data: function() {
    return {
    	cartArray:[],
    	// calcQty:0,
    }
  },
  created() {
  	this.cartArray = this.getCart();
  	// this.calcQty = this.getCartCount(this.cartArray);
  },
  computed: {
  	calcQty: function() {
  		return this.getCartCount(this.cartArray);
  	},
  	calcTotal: function() {
  		return this.getCartTotal(this.cartArray);
  	}
  },
  methods: {
  	removeProductCart: function(product) {
  		this.removeItemCart(product);
  		this.cartArray = this.getCart();
  	},
  	addItemCart: function(product) {
  		console.log(product);
  		this.addOneQty(product);
  		this.cartArray = this.getCart();
  	},
  	deleteItemCart: function(product) {
  		console.log(product);
  		this.removeOneQty(product);
  		this.cartArray = this.getCart();
  	},
  	clearShopCart: function() {
  		this.clearCart();
  		this.cartArray = this.getCart();
  	}
  },
  filters:{
  	formatPriceDecimal: function(value) {
  		return value.toFixed(2);
  	}
  }
}
</script>

<style lang="css" scoped>
.shop__table {
    width:50%;
    margin:50px auto;
}
</style>