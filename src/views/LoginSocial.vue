
<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="appLogo"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              {{ appName }}
            </h2>
          </router-link>
        </v-card-title>

        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Login via Social! 👋🏻
          </p>
          <p class="mb-2">Aguarde um momento.</p>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="190"
      :src="
        require(`@/assets/images/misc/mask-${
          $vuetify.theme.dark ? 'dark' : 'light'
        }.png`)
      "
    />

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import themeConfig from "@themeConfig";
import store from "@/store";
import axios from "axios";
import { AbilityBuilder, Ability } from '@casl/ability';

export default {
  name: "LoginSocial",
  components: {},
  data: () => ({
    data: {
      payload: "",
      provider: "",
    },
    isPasswordVisible: false,
    email: "",
    password: "",
    message: "",
    isSnackbarVisible: false,
    // themeConfig
    appName: themeConfig.app.name,
    appLogo: themeConfig.app.logo,
  }),
  methods: {
    async loginUser() {
      store
        .dispatch("auth/loginUserCallback", this.data)
        .then((resp) => {
          if (resp.data.data.access_token) {
            /*const userData = JSON.stringify(localStorage.getItem("user"));*/
            const userToken = localStorage.getItem("accessToken");
            const token = resp.data.data.access_token;
          
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("accessToken", token);
            // auth_success.value = true;

            store.dispatch("auth/dadosUsuario").then((result) => {
              if (result.data.data.user) {
                const user = result.data.data.user;              
                this.updateAbility(user);
                // Set user's data in localStorage for UI/Other purpose
                localStorage.setItem("userData", JSON.stringify(user));
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("role", user.role);

                store.commit("auth/setUser", user);
                store.commit("auth/setUsuario", user);
                store.commit("auth/auth_status", "LOGADO");
                store.commit("auth/setRole", user.role);  
                this.$router.push("/");
              }
            });
          }
        })
        .catch((error) => {
          console.log(error)
          this.$store.dispatch("module/openSnackBar", {
            color: "error",
            timeout: 10000,
            text: "Oops, dados vencidos, você será redirecionado para tela login.",
          });
          /* setTimeout(() => {
            this.$router.push("/login");
          }, 3000);*/
        });
    },
    updateAbility(user) {
      const { can, rules } = new AbilityBuilder(Ability);

      const { ability: userAbility } = user;
      
      // Set user ability
      // ? https://casl.js.org/v5/en/guide/intro#update-rules
      this.$ability.update(userAbility);

      // Set user's ability in localStorage for Access Control
      localStorage.setItem(
        "userAbility",
        JSON.stringify(userAbility)
      );

      // We will store `userAbility` in localStorage separate from userData
      // Hence, we are just removing it from user object
      delete user.ability;

    }
  },
  created() {
    this.data.payload = this.$route.query.code;
    this.data.provider = this.$route.path.split("/")[2];
    this.loginUser();
  },
};
</script>

<style lang="scss" scoped>
@import "@core/preset/preset/pages/auth.scss";
</style>
