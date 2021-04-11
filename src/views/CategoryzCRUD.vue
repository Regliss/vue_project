<template>
  <div class="categoryz__crud">
    <TitlePage title="Gestion des categories" />
    <div style="margin-left: 980px;">
      <router-link to="/addCategory" custom v-slot="{ navigate }">
        <b-button variant="info" @click="navigate" @keypress.enter="navigate" role="link">Ajouter</b-button>
      </router-link>
    </div>
    <p></p>
    <b-container>
      <b-table-simple bordered>
        <b-thead head-variant="dark" bordered>
          <b-tr>
            <b-th>Id</b-th>
            <b-th>Titre</b-th>
            <b-th>Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="category in categoryzFromApi" :key="category._id">
            <b-td> {{ category._id }} </b-td>
            <b-td> {{ category.title }} </b-td>
            <b-td>
   			  <router-link :to="{name:'UpdateCategory',params:{id:category._id}}" custom v-slot="{ navigate }">
                <b-button variant="info" @click="navigate" @keypress.enter="navigate" role="link">Modifier</b-button>
              </router-link> |
              <b-button variant="danger">Supprimer </b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-container>
  </div>
</template>

<script>
import TitlePage from "../components/TitlePage";
import ApiCategoryzCrud from "../mixins/ApiCategoryzCrud";

export default {
  data: function() {
    return {
      categoryzFromApi: [],
    };
  },
  components: {
    TitlePage,
  },
  mixins: [ApiCategoryzCrud],
  created() {
    this.getCategoryz()
      .then((data) => {
        console.log(data);
        this.categoryzFromApi = data;
      })
      .catch(err => console.log(err));
  },
};
</script>

<style lang="scss" scoped>

</style>
