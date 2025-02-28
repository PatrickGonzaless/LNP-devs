const form = document.querySelector("form");
const Iemail = document.querySelector(".email");
const Ipassword = document.querySelector(".password");

function navigateTo(page) {
  window.location.href = page;
}

function login() {
  return fetch("http://localhost:8080/users", {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].email === Iemail.value && res[i].senha === Ipassword.value) {
          if (res[i].grupo === "Adm" || res[i].grupo === "Administrador") {
            navigateTo("../pages/linkPage.html");
            return;
          }
          navigateTo("../pages/emConstrucao.html");
          return;
        }
      }
      alert("Usuario ou senha incorretos");
      clean();
      return;
    })
    .catch(function () {
      alert("Não sei o que aconteceu");
      clean();
      return;
    });
}

function clean() {
  Iemail.value = "";
  Ipassword.value = "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  login();
});
