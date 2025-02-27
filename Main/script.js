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
          clean();
          return res[i];
        }
      }
      alert("Usuario ou senha incorretos");
      clean();
      return null;
    })
    .catch(function (res) {
      clean();
      return null;
    });
}

function clean() {
  Iemail.value = "";
  Ipassword.value = "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let user = login();
  if (user.email == Iemail) {
    navigateTo("../LinkPage/index.html");
  }
});
