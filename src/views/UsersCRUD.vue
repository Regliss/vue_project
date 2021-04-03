<template>
    <div class="user__crud">
        <TitlePage title="Gestion des utilisateurs" />

        <b-container>
        <b-table-simple bordered> 
            <b-thead head-variant="dark" bordered>
                <b-tr>
                    <b-th>Id</b-th>
                    <b-th>Nom</b-th>
                    <b-th>Prénom</b-th>
                    <b-th>Adresse</b-th>
                    <b-th>Téléphone</b-th>
                    <b-th>isAdmin</b-th>
                    <b-th>Action</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="user in usersFromApi" :key="user._id">
                    <b-td> {{ user._id }} </b-td>
                    <b-td> {{user.lastName}} </b-td>
                    <b-td> {{user.firstName}}  </b-td>
                    <b-td> {{user.address}} </b-td>
                    <b-td> {{user.phone}} </b-td>
                    <b-td> {{user.isAdmin}} </b-td>
                    <b-td> 
                        <b-button variant="info" >Modifier </b-button> |
                        <b-button variant="danger" >Supprimer </b-button>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    

    </b-container>
    </div>
</template>

<script>

import TitlePage from '../components/TitlePage';
import ApiUsersCrud from '../mixins/ApiUsersCrud';

export default {
    data: function(){
        return {
            usersFromApi:[],
        }
    },
    components: {
        TitlePage
    },
    mixins:[ApiUsersCrud],
    created() {
        this.getUsers() 
        .then(data => {
            this.usersFromApi = data;
        })
        .catch(err => console.log(err))          
    },
    
}
</script>

<style lang="scss" scoped>

</style>