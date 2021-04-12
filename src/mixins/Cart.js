export default {
	methods: {
		//Quand vous insérer dans le localstorage il faut stringifier
		//Le panier sera dans un tableau d'object
		addToCart(product) {
			//Ajouter un produit dans mon localstorage
			//créer un object avec les informations du produit, ne pas oublier de rajouter une quantité à 1
			//insérer cet object dans le localstorage //localstorage.setItem('card');
			let cart = JSON.parse(localStorage.getItem('cart')) || [];

			let productObject = {
				_id: product._id,
				title: product.title,
				image: product.image,
				price: product.price,
				qty: 1
			}

			//findIndex => renvoies l'index ou -1
			let indexOfexisttingProduct = cart.findIndex(
				(el) =>  el._id === productObject._id 
			)

			if(indexOfexisttingProduct !== -1) {
				cart[indexOfexisttingProduct].qty += 1
			}
			else {
				cart.push(productObject)
			}

			localStorage.setItem('cart', JSON.stringify(cart));
		},
		getCart() {
			return JSON.parse(localStorage.getItem('cart'));
		},
		removeItemCart(product) {
			//Récupérer le panier localstorage.getItem + parser
			//Le modifier
			//le réinsérer localstorage.setItem
			let cart = JSON.parse(localStorage.getItem('cart'));
			const filteredCard = cart.filter((item) => {
				return item._id !== product._id;
			});
			localStorage.setItem('cart', JSON.stringify(filteredCard));
		},
		clearCart() {
			localStorage.removeItem('cart');
		},
		removeOneQty(product) {
			let cart = JSON.parse(localStorage.getItem('cart'));
			if (product.qty > 1) {
				let productObject = {
					_id: product._id,
					title: product.title,
					image: product.image,
					price: product.price,
					qty: 1
				}

				let indexOfexisttingProduct = cart.findIndex((el) => el._id === productObject._id);
				console.log(indexOfexisttingProduct);
				if (indexOfexisttingProduct !== -1) {
					cart[indexOfexisttingProduct].qty--;
				}
				localStorage.setItem('cart', JSON.stringify(cart));
			}
		},
		addOneQty(product) {
			let cart = JSON.parse(localStorage.getItem('cart'));
			let productObject = {
				_id: product._id,
				title: product.title,
				image: product.image,
				price: product.price,
				qty: 1
			}
			let indexOfexisttingProduct = cart.findIndex((el) => el._id === productObject._id);
			console.log(indexOfexisttingProduct);
			if (indexOfexisttingProduct !== -1) {
				cart[indexOfexisttingProduct].qty++;
			}
			localStorage.setItem('cart', JSON.stringify(cart));
		},
		getCartTotal(card) {
			//Montant total du panier
			if (card) {
				let total = card.reduce(
					(total, item) => total + (item.qty * item.price), 0
				);
				return total;	
			}
		},
		getCartCount(card) {
			//nombre de qty dans le panier
			if (card) {
				let total = card.reduce(
					(total, item) => total + item.qty, 0
				);
				return total;	
			}
		}
	}
}