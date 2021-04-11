<template>
    <div class="wishlist">
        <TitlePage title="Page WishList" />
        <div>
            <b-table-simple bordered>
                <b-thead>
                    <b-tr>
                        <b-th>Titre</b-th>
                        <b-th>Image</b-th>
                        <b-th>Prix</b-th>
                        <b-th>Actions</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr
                        v-for="product in wishListArray"
                        v-bind:key="product._id"
                    >
                        <b-td>{{ product.title }}</b-td>
                        <b-td><img :src="product.image" class="img__product" style="max-width: 5rem;" /></b-td>
                        <b-td>
                            {{
                                product.price | formatPriceDecimal | formatPrice
                            }}
                        </b-td>
                        <b-td>
                            <b-button variant="danger" @click="removeItem(product)">
                                Supprimer l'élément
                            </b-button>
                            <b-button variant="info" @click="addItemToCart(product)">
                                Ajouter au panier
                            </b-button>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple bordered>
        <b-button variant="danger" @click="clear()">Vider la liste</b-button>
        </div>
        <!-- <div v-else>
            Votre liste de souhait est vide
        </div> -->
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
            this.addToCart(product);
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
