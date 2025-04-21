document.getElementById("leave").style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
    const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));
  
    if (loggedInCostumer) {
      verifCostumer(loggedInCostumer);
      console.log(loggedInCostumer);
      //selecionar o formulario e preencher com os dados do cliente
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


    // PIX
  const pixRadio = document.getElementById("pix");
  const pixDescription = document.getElementById("pixDescription");
  const pixArea = document.getElementById("pixArea");

  // BOLETO
  const boletoRadio = document.getElementById("boleto");
  const boletoDescription = document.querySelector(".boletoDescription");
  const boletoArea = document.querySelector(".bankSlipArea");

  // CARTÃO
  const cartaoRadio = document.getElementById("cartao");
  const cardFieldsArea = document.getElementById("cardFieldsArea");
  const cartaoArea = document.querySelector(".creditCardArea");

  function resetAll() {
    // Esconde descrições
    pixDescription.style.display = "none";
    boletoDescription.style.display = "none";
    cardFieldsArea.innerHTML = "";

    // Reseta alturas
    pixArea.style.height = "10vh";
    boletoArea.style.height = "10vh";
    cartaoArea.style.height = "10vh";
  }

  // PIX
  pixRadio.addEventListener("change", function () {
    if (this.checked) {
      resetAll();
      pixDescription.style.display = "block";
      pixArea.style.height = "20vh";
    }
  });

  // BOLETO
  boletoRadio.addEventListener("change", function () {
    if (this.checked) {
      resetAll();
      boletoDescription.style.display = "block";
      boletoArea.style.height = "22vh";
    }
  });

  // CARTÃO
  cartaoRadio.addEventListener("change", function () {
    if (this.checked) {
      resetAll();
      cartaoArea.style.height = "32vh";
      cardFieldsArea.innerHTML = `
        <div class="cardFields">
          <label>Nome no Cartão:</label>
          <input type="text" placeholder="Como aparece no cartão" />

          <label>Número do Cartão:</label>
          <input type="text" placeholder="0000 0000 0000 0000" maxlength="19" />

          <label>Validade:</label>
          <input type="text" placeholder="MM/AA" maxlength="5" />

          <label>CVV:</label>
          <input type="text" placeholder="123" maxlength="4" />
        </div>
      `;
    }
  });


  
//   function showDesc() {
//     const pixDesc = document.getElementById("pixDescription");
//     

//     const cardDesc = document.getElementById("cardDesc");
//     const boletoDesc = document.getElementById("boletoDesc");
  
//     if (pixDesc.style.display === "none") {
//       pixDesc.style.display = "block";
//       pixHeight.style.height = "20vh";
//       cardDesc.style.display = "none";
//       boletoDesc.style.display = "none";
//     } else {
//       pixDesc.style.display = "none";
//       pixHeight.style.height = "10vh";
//     }
//   }