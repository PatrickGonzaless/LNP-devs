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
  