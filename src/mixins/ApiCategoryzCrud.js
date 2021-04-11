import apiConfigs from "../configs/api.configs";

export default {
    methods: {
        getCategoryz() {
            return fetch(`http://localhost:3000/api/v1/categoryz/`)
            .then(res=>res.json())
        }
    }
}