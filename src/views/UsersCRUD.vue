<template>
  <div class="user__crud">
    <TitlePage title="Gestion des utilisateurs" />
    <div style="margin-left: 980px;">
      <router-link to="/addAdmin" custom v-slot="{ navigate }">
        <b-button variant="info" @click="navigate" @keypress.enter="navigate" role="link">Ajouter</b-button>
      </router-link>
    </div>
    <p></p>
    <b-container>
      <b-table-simple bordered>
        <b-thead head-variant="dark" bordered>
          <b-tr>
            <b-th>Id</b-th>
            <b-th>Nom</b-th>
            <b-th>Prénom</b-th>
            <b-th>Adresse</b-th>
            <b-th>Téléphone</b-th>
            <b-th>Email</b-th>
            <b-th>Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="user in usersFromApi" :key="user._id">
            <b-td> {{ user._id }} </b-td>
            <b-td> {{ user.lastName }} </b-td>
            <b-td> {{ user.firstName }} </b-td>
            <b-td> {{ user.address }} </b-td>
            <b-td> {{ user.phone }} </b-td>
            <b-td> {{ user.email }} </b-td>
            <b-td>
              <router-link to="/updateUser" custom v-slot="{ navigate }">
                <b-button variant="info" @click="navigate" @keypress.enter="navigate" role="link">Modifier</b-button>
              </router-link>
              <b-button variant="danger" @click="remove(user._id)">Supprimer </b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-container>
  </div>
</template>

<script>
import TitlePage from "../components/TitlePage";
import ApiUsersCrud from "../mixins/ApiUsersCrud";

export default {
  data: function() {
    return {
      usersFromApi: [],
    };
  },
  components: {
    TitlePage,
  },
  mixins: [ApiUsersCrud],
  created() {
    this.getUsers()
      .then((data) => {
        console.log(data);
        this.usersFromApi = data;
      })
      .catch(err => console.log(err));
    // this.deleteUser()
    //   .then((data) => {
    //     console.log(data);
    //     this.usersFromApi = data;
    //   })
    //   .catch(err => console.log(err));
  },
  methods: {
	    remove(id) {
	        fetch(`http://localhost:3000/api/v1/users/delete/${id}`)
	            .then((res) => res.json())
	            .catch((err) => console.log(err));
	            this.$router.go();
	    }	
    }
};
</script>

<style lang="scss" scoped>

</style>
