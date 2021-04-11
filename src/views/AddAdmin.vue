<template>
  <div>
    <TitlePage title="S'inscrire" />
    <div
      class="form"
      style="border: 1px solid; background-color: grey; border-radius: 15px"
    >
      <form @submit.prevent="signup">
        <div class="form__group">
          <label for="lastName">Nom</label><br />
          <input type="text" name="lastName" v-model="lastName" />
        </div>
        <div class="form__group">
          <label for="firstName">Prénom</label><br />
          <input type="text" name="firstName" v-model="firstName" />
        </div>
        <div class="form__group">
          <label for="phone">Téléphone</label><br />
          <input type="text" name="phone" v-model="phone" />
        </div>
        <div class="form__group">
          <label for="address">Adresse</label><br />
          <input type="text" name="address" v-model="address" />
        </div>
        <div class="form__group">
          <label for="email">Email</label><br />
          <input type="email" name="email" v-model="email" />
        </div>
        <div class="form__group">
          <label for="password">Mot de passe</label><br />
          <input type="password" name="password" v-model="password" />
        </div>
        <div>
  			<label for="isAdmin">isAdmin</label>
  			<input type="checkbox" name="isAdmin" v-model="isAdmin">
		</div>
        <div class="form__group">
          <input type="submit" value="S'inscrire" />
        </div>
      </form>
      <p v-if="messageError">
        {{ messageError }}
      </p>
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
  data: function () {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      isAdmin: "",
      messageError: "",
    };
  },
  methods: {
    signup: function () {
      const body = {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        address: this.address,
        email: this.email,
        password: this.password,
        isAdmin: this.isAdmin,
      };
      console.log(body, "body JS");
      const bodyToSend = JSON.stringify(body);
      console.log(bodyToSend, "body stringify");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyToSend,
      };
      fetch(`http://localhost:3000/api/v1/users/add`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
        	console.log(data);
          if (!data.auth) {
            this.messageError = data.message;
          } else {
            let token = data.token;
            localStorage.setItem("token", token);
            this.$router.push("/usersCrud");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped></style>
