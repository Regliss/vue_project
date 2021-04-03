<template>
    <div class="wishlist">
        <TitlePage title="Page WishList" />
        <div>
            <b-table-simple bordered>
                <b-thead>
                    <b-tr>
                        <b-th>Image</b-th>
                        <b-th>Titre</b-th>
                        <b-th>Prix</b-th>
                        <b-th>Actions</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="product in wishListArray" v-bind:key="product._id">
                        <b-td><img :src="product.image" class="img__product" style="max-width: 5rem;"/></b-td>
                        <b-td>{{ product.title }}</b-td>
                        <b-td>
                            {{
                                product.price | formatPriceDecimal | formatPrice
                            }}
                        </b-td>
                        <b-td>
                            <b-button @click="removeItem(product)">
                                Supprimer l'élément
                            </b-button> | 
                            <b-button @click="addItemToCart(product)">
                                Ajouter au panier
                            </b-button>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple bordered>
        </div>
        <button @click="clear()">Vider la liste</button>
    </div>
</template>

<script>
import TitlePage from "../components/TitlePage";
import WishList from "../mixins/WishList";
import Cart from "../mixins/Cart";
export default {
    components: {
        TitlePage,
    },
    data() {
        return {
            wishListArray: [],
        };
    },
    mixins: [WishList, Cart],
    created() {
        this.wishListArray = this.getWishList();
    },
    methods: {
        removeItem(product) {
            this.removeItemWishList(product);
            this.wishListArray = this.getWishList();
        },
        addItemToCart: function(product) {
            this.addOneQty(product);
            this.cartArray = this.getCart();
        },
        clear(){
            this.clearWishList()
            this.wishListArray = this.getWishList()
        }
    },
};
</script>

<style lang="scss" scoped>
.wishlist {
    width: 50%;
    margin: 50px auto;
}
.img__product {
    max-width: 200px;
    max-height: 200px;
}
</style>
