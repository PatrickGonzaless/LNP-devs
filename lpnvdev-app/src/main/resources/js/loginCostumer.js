const urlParams = new URLSearchParams(window.location.search);
const compra = urlParams.get("logged") || false;

document.getElementById("leave").style.display = "none";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch("http://localhost:8080/costumer/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Falha no login");
      }
      return res.json();
    })
    .then((response) => {
      if (response) {
        alert("Login realizado com sucesso!");
        localStorage.setItem("loggedInCostumer", JSON.stringify(response));
        if (compra) {
          window.location.href = "../pages/checkoutScreen.html";
        }
        window.location.href = "../pages/mainProductSc.html";
      } else {
        alert("Email ou senha inválidos.");
      }
    })
    .catch((err) => {
      alert("Email ou senha inválidos.");
    });
});
