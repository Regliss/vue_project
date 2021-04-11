import apiConfigs from "../configs/api.configs";

export default {
    methods: {
        getOrders() {
            return fetch(`http://localhost:3000/api/v1/orders/`)
            .then(res=>res.json())
        }
    }
}