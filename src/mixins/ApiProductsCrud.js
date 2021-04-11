import apiConfigs from "../configs/api.configs";

export default {
    methods: {
        getProducts() {
            return fetch(`http://localhost:3000/api/v1/products`)
            .then(res=>res.json())
        }
    }
}