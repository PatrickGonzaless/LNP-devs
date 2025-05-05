document.getElementById("leave").style.display = "none";
const voltar = document.getElementById("goBack");
const enderecos = document.querySelector(".address-box");
const concluir = document.getElementById("btn-pagar");

document.addEventListener("DOMContentLoaded", () => {
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));

  if (loggedInCostumer) {
    verifCostumer(loggedInCostumer);
  } else {
    document.getElementById("costumerLogin").style.display = "block";
  }

  let adres = loggedInCostumer.enderecos;
  adres.forEach((address) => {
    let linha = `
          <p>${address.logradouro}, ${address.bairro}, ${address.numero} - ${address.cep}</p>
          <p>${address.cidade}/${address.uf}</p>
          <input type="radio" name="principal" ${address.principal} ? checked || />`;
    enderecos.insertAdjacentHTML("beforeend", linha);
  });

  let subtotal = document.getElementById("subTotal");
  subtotal.innerText += localStorage.getItem("subTotal");
  let total = document.getElementById("total");
  total.innerText += localStorage.getItem("total");
  let frete = document.getElementById("frete");
  frete.innerText += localStorage.getItem("frete")
    ? localStorage.getItem("frete")
    : "none";

  let freteText = `
  <div class="shipping-option">
    <label
      ><input type="radio" name="frete" checked/>SEDEX - 3 dias úteis</label
    >
    <span>${localStorage.getItem("frete")}</span>
  </div>
  `;
  document
    .getElementsByClassName("shipping-section")[0]
    .insertAdjacentHTML("beforeend", freteText);
});

voltar.addEventListener("click", () => {
  window.location.href = "../pages/cartScreen.html";
});
function verifCostumer(costumer) {
  document.getElementById("leave").style.display = "block";
  const perfilC = document.getElementById("perfilC");
  const costumerLogin = document.getElementById("costumerLogin");
  const costumerLogout = document.getElementById("leaves");
  const areacostumer = document.getElementById("areaLoginCostumer");

  if (perfilC) {
    perfilC.innerHTML = `${costumer.nomecompleto}, Cliente`;
  }

  if (costumerLogin) {
    costumerLogin.style.display = "none";
    areacostumer.style.display = "block";
  }
  if (costumerLogout) {
    costumerLogout.style.display = "block";
    costumerLogout.addEventListener("click", costumerLogouts);
  }
}

function costumerLogouts() {
  console.log("Logout realizado com sucesso!");
  localStorage.removeItem("loggedInCostumer");
  window.location.href = "../pages/loginCostumer.html";
}
