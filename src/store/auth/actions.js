import axios from "axios";

async function login({ commit, dispatch }, data) {
  return new Promise((resolve, reject) => {
    axios
    .post(process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/login", data)
    .then(response => resolve(response))
              .catch(error => {
            window.location.reload()
            reject(error)
          })
  });
}
async function loginSocial({ commit, dispatch }, provider) {
  return new Promise((resolve, reject) => {
    axios({
      url: process.env.VUE_APP_BASE_URI_API_MANUTENCAO + `/authorize/${provider}/redirect`,
      method: "GET",
    })
      .then((response) => {
        resolve(response)
      })
      .catch((erro) => {
        console.error("Oops, Unable to login!");
        console.log("error :>> ", erro.response);
        reject(erro.response);
      });
  });
} 

async function loginUserCallback({ commit, dispatch }, data) {
  return new Promise((resolve, reject) => {
    axios
    .get(process.env.VUE_APP_BASE_URI_API_MANUTENCAO + `/authorize/${data.provider}/callback?code=${data.payload}`)
    .then((response) => {
        if (response.status === 200 && response.data.data.access_token) {
          const token = response.data.data.access_token;
          localStorage.setItem("accessToken", token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          resolve(response);
        }
        if (response.status === 200 && (response.data.data.codigo == 10 || response.data.data.codigo == 1))
        {
          resolve(response);
        }
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}

async function recuperarSenha({ commit, dispatch }, data) {
  return new Promise((resolve, reject) => {
    axios
    .post(process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/forgotPassword", data)
    .then(response => resolve(response))
              .catch(error => {
            window.location.reload()
            reject(error)
          })
  });
}

async function validarToken({ commit, dispatch }, dados) {
  return new Promise((resolve, reject) => {
    const token = dados.split("=");
    const data = {
      token: token[1],
    };
    axios({
      url: process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/validToken",
      data: data,
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.codigo == false) {
            commit("setErrorMessage", "Link expirado, tente novamente.");
            this.$route.push("auth-login");
          }
          resolve(true);
        }
        resolve(false);
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}

async function novaSenha({ commit, dispatch }, data) {
  return new Promise((resolve, reject) => {
    axios
    .post(process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/registerNewPassword", data)
    .then(response => resolve(response))
              .catch(error => {
            window.location.reload()
            reject(error)
          })
  });

}

async function register({ commit, dispatch }, data) {
  return new Promise((resolve, reject) => {
    axios
    .post(process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/register", data)
    .then(response => resolve(response))
              .catch(error => {
            window.location.reload()
            reject(error)
          })
  });
}

async function dadosUsuario({ commit, dispatch }) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('accessToken')
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
    .get(process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/v1/usuario/dados-usuario")
    .then(response => resolve(response))
              .catch(error => {
            window.location.reload()
            reject(error)
          })
  });
}

export default {
  login,
  loginSocial,
  loginUserCallback,
  recuperarSenha,
  novaSenha,
  validarToken,
  dadosUsuario,
  register,
};
