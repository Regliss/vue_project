<template>
  <div class="categoryz__crud">
    <TitlePage title="Gestion des commandes" />
    <!-- <div style="margin-left: 980px;"> -->
      <!-- <router-link to="/addOrder" custom v-slot="{ navigate }">
        <b-button variant="info" @click="navigate" @keypress.enter="navigate" role="link">Ajouter</b-button>
      </router-link> -->
    <!-- </div> -->
    <p></p>
    <b-container>
      <b-table-simple bordered>
        <b-thead head-variant="dark" bordered>
          <b-tr>
            <b-th>Id</b-th>
            <b-th>Statut</b-th>
            <b-th>Produits</b-th>
            <b-th>User</b-th>
            <b-th>Action</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="order in ordersFromApi" :key="order._id">
            <b-td> {{ order._id }} </b-td>
            <b-td> {{ order.status }} </b-td>
            <td>
                <p v-for="product in order.products" v-bind:key="product._id">
                    {{ product.title }}
                </p>
            </td>
            <b-td> {{ order.user.lastName }} {{ order.user.firstName }}</b-td>
            <b-td>
   			  <!-- <router-link :to="{name:'UpdateOrder',params:{id:order._id}}" custom v-slot="{ navigate }">
                <b-button variant="info" @click="navigate" @keypress.enter="navigate" role="link">Modifier</b-button>
              </router-link> | -->
              <b-button variant="info" class="btn_edit" @click="update(order._id)">Modifier</b-button> |
              <b-button variant="danger" @click="remove(order._id)">Supprimer </b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-container>
  </div>
</template>

<script>
import TitlePage from "../components/TitlePage";
import ApiOrdersCrud from "../mixins/ApiOrdersCrud";

export default {
  data: function() {
    return {
      ordersFromApi: [],
    };
  },
  components: {
    TitlePage,
  },
  mixins: [ApiOrdersCrud],
  created() {
    this.getOrders()
      .then((data) => {
        console.log(data);
        this.ordersFromApi = data;
      })
      .catch(err => console.log(err));
  },
  methods: {
	    remove(id) {
	        fetch(`${apiConfigs.apiUrl}/orders/delete/${id}`)
	            .then((res) => res.json())
	            .catch((err) => console.log(err));
	            this.$router.go();
	    },
	    update(order) {
    		localStorage.setItem('order',order)
    		this.$router.push('/updateOrder')
		},	
    }
};
</script>

<style lang="scss" scoped>

</style>
