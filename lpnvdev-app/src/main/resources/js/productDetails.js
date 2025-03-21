let id = localStorage.getItem("productId");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

function verifUser() {

    if (loggedInUser) {
        const perfil = document.getElementById("perfil");
        const userLogin = document.getElementById("userLogin");
        const userLogout = document.getElementById("userLogout");

        if (perfil) {
            perfil.innerHTML = `${loggedInUser.username}, ${loggedInUser.grupo}`;
        }

        if (userLogin) userLogin.style.display = "none";
        if (userLogout) userLogout.style.display = "block";

        const logoutButton = document.getElementById("userLogout");
        if (logoutButton) {
            logoutButton.addEventListener("click", logout);
        }
    } else {
        const userLogin = document.getElementById("userLogin");
        const userLogout = document.getElementById("userLogout");

        if (userLogin) userLogin.style.display = "block";
        if (userLogout) userLogout.style.display = "none";
    }

    listProduct();
}

function logout() {
    localStorage.removeItem("loggedInUser");

    window.location.href = "./index.html";
}

function listProduct() {
    fetch(`http://localhost:8080/product`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "GET",
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `Erro na requisição: ${res.status} - ${res.statusText}`
                );
            }
            return res.json();
        })
        .then((produto) => {
            console.log(produto);
            fillInformation(produto); 
        })
        .catch((err) => {
            alert("Erro ao buscar produtos: " + err.message);
        });
}

function fillInformation(produto) {
    produto.forEach(element => {
        console.log(element.nome);
        console.log(id);
        if(element.id == id){
            console.log(element);
            document.getElementById("productName").innerText =
            element.nome || "Nome não disponível";
          document.getElementById("descriptionArea").innerText =
          element.descricao || "Sem descrição disponível";
        
          let precoFormatado = element.valor
            ? element.valor.toFixed(2)
            : "Preço não disponível";
          document.getElementById("priceArea").innerText =
            precoFormatado || "Preço não disponível";
        
          let avaliacaoFormatada = element.avaliacao
            ? element.avaliacao.toFixed(1)
            : "Preço não disponível";
          document.getElementById("rateArea").innerText =
            avaliacaoFormatada || "Avaliação não disponível";
        }     
    });
   
  }

document.addEventListener("DOMContentLoaded", () => {
    verifUser();
});
 