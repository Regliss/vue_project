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
					<b-th>-1</b-th>
					<b-th>+1</b-th>
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
		<div v-if="cartArray">
			Quantité Totale : {{calcQty}}
		</div>
		<div v-if="cartArray">
			Prix Totale : {{calcTotal | formatPriceDecimal |formatPrice}}
		</div>
		<b-button variant="danger" @click="clearShopCart()">Supprimer le panier</b-button> | 
		<b-button @click="checkout()">Payer</b-button>
	</div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IYB3kKHE4A4HHrOPwry6jr7QSnFpODKJliEseS4NYAxmsuAnRfVkNgfdDcSEsMPPOqCEc5NhCGowDFhoy5D9zlu00jW1rgElH');
import Cart from "../mixins/Cart";
import apiConfigs from "../configs/api.configs";
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
  	},
	checkout: async function(){
	  	const stripe = await stripePromise;
	  	const response = await fetch('${apiConfigs.apiUrl}/create-checkout-session', { 
	  		method: 'POST',
	  		headers: {
	  			"Content-type":"application/json"
	  		},
	  		body:JSON.stringify({
	  			amount:this.calcTotal.toFixed(2) * 100
	  		})
	  	});
	  	const session = await response.json();
	  	const result = await stripe.redirectToCheckout({
	      sessionId: session.id,
	    });
	     console.log(result);
	    if (result.error) {
	      console.log(result.error);
	    }
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