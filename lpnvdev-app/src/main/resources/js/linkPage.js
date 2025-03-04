const nome = document.getElementById("name");
const email = document.getElementById("email");
const grupo = document.getElementById("grupo");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

window.onload = function () {
  nome.innerHTML = loggedInUser.username;
  email.innerHTML = loggedInUser.email;
  grupo.innerHTML = loggedInUser.grupo;

  if (loggedInUser.grupo === "Adm" || loggedInUser.grupo === "Administrador") {
    document.getElementById("pedido").style.display = "none";
  }
};
