<template>
	<div class="title__page">
		<TitlePage title="Page contact"/>
		<Button btnClass="btn btn-black" btnText="Click Me" v-bind:btnFunction="clickMe" />
	</div>
</template>

<script>
import TitlePage from "../components/TitlePage";
import Button from "../components/Button";

export default {
  name: 'Contact',
  components: {
  	TitlePage,
  	Button
  },
  methods: {
    clickMe: function() {
      console.log("its clicked");
    }
  }
}
</script>

<style lang="css" scoped>
</style>