document.getElementById("leave").style.display = "none";
const modal = document.getElementById("myModal");
const openModalBtnT = document.getElementById("addAdressT");
const openModalBtnD = document.getElementById("addAdressD");
const closeModalBtn = document.getElementById("closeModalBtn");
const selectEndereco = document.getElementById("adressPrincipal");
const title = document.getElementsByClassName("taxAdressContent")[0];

// Quando o botão "Abrir Modal" for clicado, o modal é mostrado
openModalBtnT.onclick = function (evt) {
  evt.preventDefault();
  let titleText = `<h4>Endereço Fiscal</h4>`;
  title.insertAdjacentHTML("afterbegin", titleText);
  modal.style.display = "block";
};
openModalBtnD.onclick = function (evt) {
  evt.preventDefault();
  let titleText = `<h4>Endereço Entrega</h4>`;
  title.insertAdjacentHTML("afterbegin", titleText);
  modal.style.display = "block";
};
// Quando o botão de fechar (X) for clicado, o modal é escondido
closeModalBtn.onclick = function () {
  title.removeChild(title.firstChild);
  modal.style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));

  if (loggedInCostumer) {
    verifCostumer(loggedInCostumer);
    console.log(loggedInCostumer);
    //selecionar o formulario e preencher com os dados do cliente
    let formCostumer = document.getElementById("dataAreaForm");
    let elementos = formCostumer.elements;
    elementos[0].value = loggedInCostumer.nomecompleto;
    elementos[1].value = loggedInCostumer.cpf;
    elementos[2].value = loggedInCostumer.email;
    elementos[3].value = loggedInCostumer.genero;
    elementos[4].value = loggedInCostumer.datanascimento;

    const formAdressT = document.getElementById("adressAreaFormT");
    let elementosAdressT = formAdressT.elements;
    const formAdressD = document.getElementById("adressAreaFormD");
    let elementosAdressD = formAdressD.elements;
    const adresses = loggedInCostumer.enderecos;
    adresses.forEach((address) => {
      if (address.tipoEndereco) {
        elementosAdressT[0].value = address.logradouro;
        elementosAdressT[1].value = address.cep;
        elementosAdressT[2].value = address.numero;
      }
      if (address.principal) {
        elementosAdressD[0].value = address.logradouro;
        elementosAdressD[1].value = address.cep;
        elementosAdressD[2].value = address.numero;
      }
    });

    let linha;
    adresses.forEach((address) => {
      if (!address.tipoEndereco) {
        linha = `<option value="${address.id}">${address.logradouro}, ${address.numero}</option>`;
        console.log(linha);
        selectEndereco.insertAdjacentHTML("beforeend", linha);
      }
    });
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

document.getElementById("alter").addEventListener("click", (event) => {
  event.preventDefault();
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));
  const formCostumer = document.getElementById("dataAreaForm");
  const elementos = formCostumer.elements;
  let linha1 = ` <input type="password" id="password1" placeholder="Digite sua senha" required/>`;
  let linha2 = ` <input type="password" id="password2" placeholder="Digite uma nova senha(OPCIONAL)"/>`;
  let linha3 = ` <input type="password" id="password3" placeholder="Repita a nova senha"/>`;

  elementos[4].insertAdjacentHTML("afterend", linha1);
  elementos[5].insertAdjacentHTML("afterend", linha2);
  elementos[6].insertAdjacentHTML("afterend", linha3);
  elementos[0].disabled = false;
  elementos[3].disabled = false;
  elementos[4].disabled = false;
  elementos[5].disabled = false;
});

document.getElementById("confirm").addEventListener("click", (evt) => {
  evt.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("password1").value;
  
  fetch("http://localhost:8080/costumer/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  })
    .then((res) => {
      console.log(res);
      console.log("esteve aqui");
      if (!res.ok) {
        throw new Error("Falha no login");
      }
      return res.json();
    })
    .then((response) => {
      if (response) {
        console.log(1);
        updateCostumer();
      } else {
        console.log(2);
        alert("senha inválida.1");
      }
    })
    .catch((err) => {
      console.log(3);
      alert("senha inválida.2");
    });
});

function updateCostumer() {
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));
  const formCostumer = document.getElementById("dataAreaForm");
  const elementos = formCostumer.elements;
  let senha1 = elementos[5].value;
  console.log("teste1");
  if (!elementos[6].value == "") {
    console.log("teste2");

    if (elementos[6].value != elementos[7].value) {
      alert("As senhas não coincidem.");
      return;
    }
    console.log("teste3");

    senha1 = elementos[6].value;
  }
  console.log("teste4");
  console.log(senha1);
  const costumer = {
    id: loggedInCostumer.id,
    nomecompleto: elementos[0].value,
    cpf: loggedInCostumer.cpf,
    email: loggedInCostumer.email,
    genero: elementos[3].value,
    datanascimento: elementos[4].value,
    senha: senha1,
    enderecos: loggedInCostumer.enderecos,
  };

  console.log(costumer);
  // Enviar os dados atualizados para o servidor
  fetch(`http://localhost:8080/costumer`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(costumer),
  })
    .then((response) => {
      if (response.ok) {
        alert("Dados atualizados com sucesso!");
        localStorage.setItem("loggedInCostumer", JSON.stringify(costumer));
        window.location.href = "../pages/costumerProfile.html";
      } else {
        console.error("Erro ao atualizar os dados do cliente.");
      }
    })
    .catch((error) => {
      console.error("Erro de rede:", error);
    });
}

window.onclick = function (event) {
  if (event.target === modal) {
    title.removeChild(title.firstChild);
    modal.style.display = "none";
  }
};
