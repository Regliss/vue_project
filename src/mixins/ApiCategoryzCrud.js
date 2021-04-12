import apiConfigs from "../configs/api.configs";

export default {
    methods: {
        getCategoryz() {
            return fetch(`${apiConfigs.apiUrl}/categoryz/`)
            .then(res=>res.json())
        }
    }
}