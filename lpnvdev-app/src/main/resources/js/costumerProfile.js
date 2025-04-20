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

document.getElementById("alter").addEventListener("click", () => {
  event.preventDefault();
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));
  const formCostumer = document.getElementById("formCostumer");
  const elementos = formCostumer.elements;

  elementos[0].disabled = false;
  elementos[3].disabled = false;
  elementos[4].disabled = false;
  elementos[5].disabled = false;
  elementos[6].disabled = false;
  elementos[7].disabled = false;
});

function confirmUser() {
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));
  const formCostumer = document.getElementById("formCostumer");
  const elementos = formCostumer.elements;
  let login = {
    email: loggedInCostumer.email,
    senha: elementos[5].value,
  };
  fetch("http://localhost:8080/costumer/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Falha na alteração");
      }
      return res.json();
    })
    .then((response) => {
      if (response) {
        updateCostumer();
      } else {
        alert("Senha inválida.");
      }
    })
    .catch((err) => {
      alert("Erro no server");
    });
}

function updateCostumer() {
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));
  const formCostumer = document.getElementById("formCostumer");
  const elementos = formCostumer.elements;
  const senha = elementos[5].value;
  if (!elementos[6].value == "") {
    if (elementos[6].value != elementos[7].value) {
      alert("As senhas não coincidem.");
      return;
    }
    senha = elementos[6].value;
  }
  const costumer = {
    id: loggedInCostumer.id,
    nomecompleto: elementos[0].value,
    cpf: loggedInCostumer.cpf,
    email: loggedInCostumer.email,
    genero: elementos[3].value,
    datanascimento: elementos[4].value,
    senha: senha,
    enderecos: loggedInCostumer.enderecos,
  };

  // Enviar os dados atualizados para o servidor
  fetch(`http://localhost:8080/costumers`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(costumer),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Dados atualizados com sucesso!");
        localStorage.setItem("loggedInCostumer", JSON.stringify(costumer));
        window.location.href = "../pages/costumerProfile.html";
      } else {
        console.error("Erro ao atualizar os dados do cliente.");
      }
    })
    .catch((error) => {
      console.error("Erro de rede:", error);
    });
  // Previne o envio do formulário padrão
  event.preventDefault();
}
