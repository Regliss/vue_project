<template>
  <div class="title__page">
    <TitlePage :title="myTitle"/>
  		{{ myAge + 0.5 }}
  	<p>
  		J'ai {{ myAge }} ans
  	</p>
  	<p>
  		{{ myAge > 30 ? "je suis vieux" : "je suis jeune" }}
  	</p>
  	<p>{{ percentCa/100 }} %</p>
  	<div class="visible__block" v-if="isVisible">
  		<p>Je suis visible</p>
  	</div>
  	<div class="unvisible__block" v-else-if="!isVisible">
  		<p>Je ne suis pas visible1</p>
  	</div>
  	<div class="unvisible__block" v-else>
  		<p>Je ne suis pas visible2</p>
  	</div>
  	<div class="font__bold" v-html="textStyling">
  		{{ textStyling}}
  	</div>
  	<div class="link">
  		<a target="_blank" :href="link">Link to google</a>
  	</div>
  	<div class="logo">
  		<img :src="googleLogo" alt="logo google">
  	</div>
  	<div class="product__grid" v-for="(product, index) in productsArray" v-bind:key="product.id">
  		{{ index }}
  		{{ product.id }}
  		{{ product.title }}
  		{{ product.price }} €
  	</div>
  	<!-- <button @evt="sayHello">SayHello</button> -->
  	<button v-on:click="sayHello('thomas')">say Hello</button>
  	<button @click="sayHello('pomart')">SayHello</button>
  	<Button buttonName="Say HELLO !" :buttonFunction="logMessage"/>
  </div>
</template>

<script>
// @ is an alias to /src

import TitlePage from "../components/TitlePage";
import Button from "../components/Button";
export default {
  name: 'Home',
  components: {
  	TitlePage,
  	Button
  },
  methods: {
  	sayHello: function(name) {
  		alert(`Hello ${name}`);
  	},
  	logMessage: function() {
  		console.log('message');
  		alert(`Hello`);
  	}
  },
  data: function() {
  	return {
  		myTitle: "Ma homepage",
  		myAge: 21.3,
  		percentCa: 2000, 
  		isVisible: false,
  		textStyling: "<strong> This text is bold </strong>",
  		link: "https://google.fr",
  		googleLogo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
  		productsArray:[
  			{id:1,title:"product 1:", price:20},
  			{id:2,title:"product 2:", price:30},
  		]
  	}
  }
}
</script>

<style scoped>
</style>
