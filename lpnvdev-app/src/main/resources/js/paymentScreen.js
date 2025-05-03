document.getElementById("leave").style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));

  if (loggedInCostumer) {
    verifCostumer(loggedInCostumer);
    console.log(loggedInCostumer);
    let formCostumer = document.getElementById("formCostumer");
    let elementos = formCostumer.elements;
    elementos[0].value = loggedInCostumer.nomecompleto;
    elementos[1].value = loggedInCostumer.cpf;
    elementos[2].value = loggedInCostumer.email;
    elementos[3].value = loggedInCostumer.genero;
    elementos[4].value = loggedInCostumer.datanascimento;
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

      const cardDescription = document.getElementById('cardDescription');

      if (cardDescription) {
        cardDescription.innerHTML = `
          <div class="credit-card-form">
            <div class="card-image">
              <div class="fake-card-image"></div>
            </div>
            <div class="card-inputs">
              <input type="text" placeholder="Número do cartão" class="input-full" />
              <input type="text" placeholder="Nome impresso no cartão" class="input-full" />
              <div class="input-row">
                <input type="text" placeholder="Validade" class="input-half" />
                <input type="text" placeholder="CVV" class="input-half" />
              </div>
              <div class="input-row">
                <input type="text" placeholder="CPF/CNPJ do titular" class="input-half" />
                <input type="text" placeholder="Data de Nascimento" class="input-half" />
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

  // 🔁 Controlador geral para garantir consistência de exibição
  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      // Oculta descrições anteriores
      document.querySelectorAll('.pixDescription, .boletoDescription, #cardDescription').forEach((desc) => {
        if (desc) {
          desc.style.display = 'none';
          desc.classList?.remove('active');
        }
      });

      const selectedOption = document.querySelector(`input[name="payment"]:checked`);
      if (selectedOption) {
        const descriptionId = selectedOption.value + "Description";
        const descriptionElement = document.getElementById(descriptionId);

        if (descriptionElement) {
          descriptionElement.style.display = 'block';
        }

        // Cartão: ativa animação e estilo
        const cardDescription = document.getElementById("cardDescription");
        const footerArea = document.getElementById("footer");
        if (cardDescription) {
          if (selectedOption.value === "cartao") {
            cardDescription.classList.add("active");
            cardDescription.style.display = "block";
            footerArea.style.marginTop = "25vh";
           ;
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
});
