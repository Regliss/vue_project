<template>
  <div class="about">
    <TitlePage title="Page about"/>
    <Button btnClass="btn btn-black" btnText="Click Me" v-bind:btnFunction="clickMe" />
    <ProductItem :ProductObject="myObject"/>
  </div>
</template>
<script>
import TitlePage from "../components/TitlePage";
import Button from "../components/Button";
import ProductItem from "../components/ProductItem";

export default {
  name:"About",
  components:{
    TitlePage, 
    Button,
    ProductItem
  },
  data: function() {
  	return {
  	myObject: {id: 44, "title": "titre", "price": 20}
  	}
  },
  methods: {
    clickMe: function() {
      console.log("its clicked");
    }
  }
}
</script>