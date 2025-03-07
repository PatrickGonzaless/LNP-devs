const form = document.querySelector("form");
const Iemail = document.querySelector(".email");
const Ipassword = document.querySelector(".password");

function navigateTo(page) {
  window.location.href = page;
}

function login() {
  const user = {
    email: Iemail.value,
    senha: Ipassword.value,
  };

  return fetch("http://localhost:8080/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.text())
    .then((response) => {
      if (response === "Login successful") {
        fetch("http://localhost:8080/users")
          .then((res) => res.json())
          .then((users) => {
            const loggedInUser = users.find(
              (user) => user.email === Iemail.value
            );

            if (loggedInUser) {
              if (
                loggedInUser.grupo === "Adm" ||
                loggedInUser.grupo === "Administrador" ||
                loggedInUser.grupo === "Estoquista"
              ) {
                localStorage.setItem(
                  "loggedInUser",
                  JSON.stringify(loggedInUser)
                );
                navigateTo("../pages/linkPage.html");
              } else {
                navigateTo("../pages/tabelaProduto.html");
              }
            } else {
              alert("Usuário não encontrado");
              clean();
            }
          })
          .catch(() => {
            alert("Erro ao buscar usuário");
            clean();
          });
      } else if (response === "Senha incorreta") {
        alert("Senha incorreta");
        clean();
      } else if (response === "Usuário não encontrado") {
        alert("Usuário não encontrado");
        clean();
      } else if (response === "Usuário desativado") {
        alert("Usuário desativado");
        clean();
      }
    })
    .catch(function () {
      alert("Não sei o que aconteceu");
      clean();
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
