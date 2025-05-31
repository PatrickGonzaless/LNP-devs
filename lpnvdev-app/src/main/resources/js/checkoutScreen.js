document.getElementById("leave").style.display = "none";
const modal = document.getElementById("myModal");
const voltar = document.getElementById("goBack");
const enderecos = document.querySelector(".address-box");
const concluir = document.getElementById("btn-pagar");
const addEndereco = document.getElementById("addEndereco");
const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));
const okModal = document.getElementById("okModal");

document.addEventListener("DOMContentLoaded", () => {
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
          <input value="${address.id}" type="radio" name="principal" ${address.principal} ? checked || />`;
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

  let freteEscolhido;
  console.log(frete.innerText);
  if (frete.innerText == "Frete:15.99") {
    freteEscolhido = "SEDEX - 3 dias úteis";
  } else if (frete.innerText == "Frete:5.99") {
    freteEscolhido = "SENAC - 10 dias úteis";
  } else {
    freteEscolhido = "FAST - Em até 2 horas";
  }
  let freteText = `
  <div class="shipping-option">
    <label
      ><input type="radio" name="frete" ${
        frete.innerText == "Frete:15.99" ? "checked" : "disabled"
      } />SEDEX - 3 dias úteis</label
    >
    <span>R$ 15,99</span>
  </div>
  <div class="shipping-option">
    <label
      ><input type="radio" name="frete"  ${
        frete.innerText == "Frete:5.99" ? "checked" : "disabled"
      } />SENAC - 10 dias úteis</label
    >
    <span>R$ 5,99</span>
  </div>
  <div class="shipping-option">
    <label
      ><input type="radio" name="frete"  ${
        frete.innerText == "Frete:56.9" ? "checked" : "disabled"
      } />FAST - Em até duas horas</label
    >
    <span>R$ 56,90</span>
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

concluir.addEventListener("click", () => {
  const val = document.querySelector('input[name="frete"]:checked');
  localStorage.setItem("enderecoEntrega", val.value);

  window.location.href = "../pages/paymentScreen.html";
});

// Quando o botão "Abrir Modal" for clicado, o modal é mostrado
addEndereco.onclick = function (evt) {
  evt.preventDefault();
  modal.style.display = "block";
};
// Quando o botão de fechar (X) for clicado, o modal é escondido
closeModalBtn.onclick = function () {
  modal.style.display = "none";
};
// Quando o usuário clicar em qualquer lugar fora do modal, o modal é escondido
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Quando o botão "OK" do modal for clicado, o modal é escondido e uma mensagem de sucesso é exibida
okModal.onclick = async function (evt) {
  evt.preventDefault();
  let form = document.getElementById("formModal");
  try {
    await fetch("http://localhost:8080/adress/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        costumerId: loggedInCostumer.id,
        logradouro: form.logradouro.value,
        bairro: form.bairro.value,
        numero: form.numero.value,
        cep: form.cep.value,
        cidade: form.cidade.value,
        uf: form.uf.value,
        complemento: form.complemento.value,
        tipoEndereco: false,
        principal: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        modal.style.display = "none";
      });
  } catch (error) {
    console.error("Erro ao cadastrar endereço:", error);
  }
};
