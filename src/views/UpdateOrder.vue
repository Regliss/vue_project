<template>
    <div>
        <TitlePage title="Modifier la commande" />
        <div class="order__update">
            <div class="form">
                <form @submit="edit">
                    <div class="form__group">
                        <label for="status">Status</label><br />
                        <select name="status" v-model="status">
                            <option value="Livré">Livré</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminé">Terminé</option>
                        </select>
                    </div>
                    <div class="form__group">
                        <input type="submit" value="Modifier" />
                    </div>
                </form>
                <p v-if="messageError">
                    {{ messageError }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import apiConfigs from "../configs/api.configs";
import TitlePage from "../components/TitlePage";
export default {
    components: {
        TitlePage,
    },
    data: function() {
        return {
            products: [],
            status: "",
            total: "",
            user: "",
            messageError: "",
        };
    },
    methods: {
        edit() {
            const body = {
                status: this.status,
            };
            const order = localStorage.getItem("order");
            const bodyToSend = JSON.stringify(body);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: bodyToSend,
            };
            fetch(`${apiConfigs.apiUrl}/orders/update/${order}`, requestOptions)
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
            this.$router.push("/ordersCRUD");
        },
    },
    created() {
        const order = localStorage.getItem("order");
        if (order) {
            fetch(`${apiConfigs.apiUrl}/order/${order}`)
                .then((res) => res.json())
                .then((data) => {
                    this._id = data._id;
                    this.products = data.products;
                    this.status = data.status;
                    this.total = data.total;
                    this.user = data.user;
                })
                .catch((err) => console.log(err));
        }
    },
    destroyed() {
        localStorage.removeItem("order");
    },
};
</script>

<style lang="scss" scoped>
.form {
    border: 1px solid;
    background-color: grey;
    border-radius: 15px;
}
.form__img {
    max-width: 200px;
    max-height: 200px;
}
</style>
