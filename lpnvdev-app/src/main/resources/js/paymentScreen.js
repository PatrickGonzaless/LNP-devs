document.getElementById("leave").style.display = "none";
const voltar = document.getElementById("goBack");
const concluir = document.getElementById("btn-revisao");

document.addEventListener("DOMContentLoaded", () => {
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));

  if (loggedInCostumer) {
    verifCostumer(loggedInCostumer);
  } else {
    document.getElementById("costumerLogin").style.display = "block";
  }

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

  const pixRadio = document.getElementById("pix");
  const pixDescription = document.getElementById("pixDescription");
  const pixArea = document.getElementById("pixArea");

  const boletoRadio = document.getElementById("boleto");
  const boletoDescription = document.querySelector(".boletoDescription");
  const boletoArea = document.querySelector(".bankSlipArea");

  const cartaoRadio = document.getElementById("cartao");
  const cartaoArea = document.querySelector(".creditCardArea");

  function resetAll() {
    if (pixDescription) pixDescription.style.display = "none";
    if (boletoDescription) boletoDescription.style.display = "none";
    if (cartaoArea) cartaoArea.style.height = "10vh";
  }

  pixRadio.addEventListener("change", function () {
    if (this.checked) {
      resetAll();
      if (pixDescription) pixDescription.style.display = "block";
      if (pixArea) pixArea.style.height = "20vh";
    }
  });

  boletoRadio.addEventListener("change", function () {
    if (this.checked) {
      resetAll();
      if (boletoDescription) boletoDescription.style.display = "block";
      if (boletoArea) boletoArea.style.height = "22vh";
    }
  });

  cartaoRadio.addEventListener("change", function () {
    if (this.checked) {
      resetAll();

      const cardDescription = document.getElementById("cardDescription");

      if (cardDescription) {
        cardDescription.innerHTML = `
          <div class="credit-card-form">
            <div class="card-inputs">
              <input type="number" min='1' max='9999999999999' placeholder="Número do cartão" class="input-full" />
              <input type="text" placeholder="Nome impresso no cartão" class="input-full" />
              <div class="input-row">
                <input type="month" placeholder="Validade" class="input-half" />
                <input type="number" min='1'max='999' placeholder="CVV" class="input-half" />
              </div>
              <div class="input-row">
                <input type="number" min='1' max='12' placeholder="nº de parcelas" class="input-half" />
              </div>
            </div>
          </div>
        `;

        cardDescription.style.display = "block";
        cardDescription.classList.add("active");
        cardDescription.style.marginBottom = "30vh";
      }
    }
  });

  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      document
        .querySelectorAll(
          ".pixDescription, .boletoDescription, #cardDescription"
        )
        .forEach((desc) => {
          if (desc) {
            desc.style.display = "none";
            desc.classList?.remove("active");
          }
        });

      const selectedOption = document.querySelector(
        `input[name="payment"]:checked`
      );
      if (selectedOption) {
        const descriptionId = selectedOption.value + "Description";
        const descriptionElement = document.getElementById(descriptionId);

        if (descriptionElement) {
          descriptionElement.style.display = "block";
        }
        const cardDescription = document.getElementById("cardDescription");
        const footerArea = document.getElementById("footer");
        if (cardDescription) {
          if (selectedOption.value === "cartao") {
            cardDescription.classList.add("active");
            cardDescription.style.display = "block";
            footerArea.style.marginTop = "25vh";
          } else {
            cardDescription.classList.remove("active");
            cardDescription.style.display = "none";
            cardDescription.style.marginBottom = "0";
            footerArea.style.marginTop = "0";
          }
        }
      }
    });
  });

  let subtotal = document.getElementById("subTotal");
  subtotal.innerText += localStorage.getItem("subTotal");
  let total = document.getElementById("total");
  total.innerText += localStorage.getItem("total");
  let frete = document.getElementById("frete");
  frete.innerText += localStorage.getItem("frete")
    ? localStorage.getItem("frete")
    : "none";
});

voltar.addEventListener("click", () => {
  window.location.href = "../pages/checkoutScreen.html";
});

concluir.addEventListener("click", () => {
  if (document.getElementById("pix").checked) {
    let resume = localStorage.getItem("resumoPedido");
    let res = JSON.parse(resume);
    res.formaPagamento = "pix";
    localStorage.setItem("resumoPedido", JSON.stringify(res));
  } else if (document.getElementById("boleto").checked) {
    let resume = localStorage.getItem("resumoPedido");
    let res = JSON.parse(resume);
    res.formaPagamento = "boleto";
    localStorage.setItem("resumoPedido", JSON.stringify(res));
  } else if (document.getElementById("cartao").checked) {
    if (
      !document.querySelector(".input-full").value ||
      !document.querySelector(".input-full").value ||
      !document.querySelector(".input-half").value ||
      !document.querySelector(".input-half").value ||
      !document.querySelector(".input-half").value
    ) {
      alert("Preencha todos os campos do cartão!");
      return;
    }
    let cartao = {
      numero: document.querySelector(".input-full").value,
      nome: document.querySelector(".input-full").value,
      validade: document.querySelector(".input-half").value,
      cvv: document.querySelector(".input-half").value,
      parcelas: document.querySelector(".input-half").value,
    };
    let resume = localStorage.getItem("resumoPedido");
    let res = JSON.parse(resume);
    res.formaPagamento = "cartao";
    res.cartao = cartao;
    localStorage.setItem("resumoPedido", JSON.stringify(res));
  } else {
    alert("Selecione um método de pagamento!");
    return;
  }
  window.location.href = "../pages/orderReview.html";
});
