<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo and title -->
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
            Redefinir senha 🔒
          </p>
          <p class="mb-2">
            Sua nova senha deve ser diferente das senhas usadas anteriormente
          </p>
        </v-card-text>

        <v-card-text>
          <v-alert text color="primary">
            <h3>Acesso ao Mailtraip</h3>
            <p>Para testar o processo de recuperação de senha acesse a plataforma do mailtrap com os dados abaixo.</p>
            <small class="d-block mb-1">
              Admin e-mail: <strong>jmatteus20@gmail.com</strong>
               / Senha:
              <strong>7Beik8xxvX@dX@S</strong>
            </small>
          </v-alert>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Senha"
              placeholder="············"
              :append-icon="
                isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline
              "
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
              class="mb-3"
              id="password"
              name="password"
              :hint="errors.first('password')"
              :error="errors.collect('password').length ? true : false"
              v-validate="{ required: true, min: 8 }"
              data-vv-validate-on="change|blur|input"
              data-vv-as="password"
              persistent-hint
            ></v-text-field>

            <v-text-field
              v-model="confirmPassword"
              outlined
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              label="Confirme a senha"
              placeholder="············"
              :append-icon="
                isConfirmPasswordVisible
                  ? icons.mdiEyeOffOutline
                  : icons.mdiEyeOutline
              "
              hide-details
              @click:append="
                isConfirmPasswordVisible = !isConfirmPasswordVisible
              "
              class="mb-3"
              id="confirmPassword"
              name="confirmPassword"
              :hint="errors.first('confirmPassword')"
              :error="errors.collect('confirmPassword').length ? true : false"
              v-validate="{ required: true, min: 8 }"
              data-vv-validate-on="change|blur|input"
              data-vv-as="confirmPassword"
              persistent-hint
            ></v-text-field>

            <v-btn block color="primary" class="mt-4" @click="recuperSenha()">
              Definir nova senha
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- back to login -->
        <v-card-actions class="d-flex justify-center align-center">
          <router-link
            :to="{ name: 'auth-login' }"
            class="d-flex align-center text-sm"
          >
            <v-icon size="24" color="primary">
              {{ icons.mdiChevronLeft }}
            </v-icon>
            <span>Volte ao login</span>
          </router-link>
        </v-card-actions>
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
import { mdiChevronLeft, mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";
import store from "@/store";
import themeConfig from "@themeConfig";

export default {
  name: "ResetPassword",
  components: {},
  data: () => ({
    icons: { mdiChevronLeft, mdiEyeOutline, mdiEyeOffOutline },
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
    password: "",
    confirmPassword: "",
    token: "",
    isSnackbarVisible: false,
    // themeConfig
    appName: themeConfig.app.name,
    appLogo: themeConfig.app.logo,
  }),
  computed: {},
  methods: {
    recuperSenha() {
      this.$validator.validateAll().then((result) => {
        if (result === true) {
          if (password.value === confirmPassword.value) {
            const data = {
              password: password.value,
              password_confirmation: confirmPassword.value,
              token: this.token[1],
            };
            store
              .dispatch("auth/novaSenha", data)
              .then((response) => {
                if (response == true) {
                  this.$store.dispatch("module/openSnackBar", {
                    color: "success",
                    timeout: 10000,
                    text: "Senha alterada com sucesso",
                  });
                  setTimeout(() => {
                    this.$router.push({ name: "auth-login" });
                  }, 1500);
                } else {
                  this.$store.dispatch("module/openSnackBar", {
                    color: "error",
                    timeout: 10000,
                    text: "Oops, aconteceu um erro por aqui, tente novamente mais tarde.",
                  });
                  setTimeout(() => {
                    this.$router.push({ name: "auth-login" });
                  }, 1500);
                }
              })
              .catch((erro) => {
                this.$store.dispatch("module/openSnackBar", {
                  color: "error",
                  timeout: 10000,
                  text: "Oops, dados invalidos.",
                });
                setTimeout(() => {
                  this.$router.push({ name: "auth-login" });
                }, 1500);
              });
          } else {
            this.$store.dispatch("module/openSnackBar", {
              color: "error",
              timeout: 10000,
              text: "Oops, dados invalidos.",
            });
            setTimeout(() => {
              this.$router.push({ name: "auth-login" });
            }, 1500);
          }
        } else {
          this.$store.dispatch("module/openSnackBar", {
            color: "error",
            timeout: 10000,
            text: "Oops, falta informações no formulário.",
          });
        }
      });
    },
  },
  created() {
    const token = this.$route.params.token;
    this.token = token.split("=");
    store
      .dispatch("auth/validarToken", token)
      .then()
      .catch((erro) => {
        this.$store.dispatch("module/openSnackBar", {
          color: "error",
          timeout: 10000,
          text: "Oops, dados invalidos.",
        });
        setTimeout(() => {
          this.$router.push({ name: "auth-login" });
        }, 1500);
      });
  },
};
</script>

<style lang="scss">
@import "@core/preset/preset/pages/auth.scss";
</style>
