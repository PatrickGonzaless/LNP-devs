document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));

  if (loggedInUser) {
    verifUser(loggedInUser);
  } else if (loggedInCostumer) {
    verifCostumer(loggedInCostumer);
  } else {
    document.getElementById("costumerLogin").style.display = "block";
    listProduct();
  }
});

function verifUser(user) {
  const perfil = document.getElementById("perfil");
  const userLogin = document.getElementById("userLogin");
  const userLogout = document.getElementById("userLogout");
  const costumerLogin = document.getElementById("costumerLogin");
  const costumerLogout = document.getElementById("costumerLogout");

  if (perfil) {
    perfil.innerHTML = `${user.username}, ${user.grupo}`;
  }

  if (userLogin) userLogin.style.display = "none";
  if (userLogout) {
    userLogout.style.display = "block";
    userLogout.addEventListener("click", logout);
  }

  // esconde o login de cliente se for usuário logado
  if (costumerLogin) costumerLogin.style.display = "none";
  if (costumerLogout) costumerLogout.style.display = "none";

  listProduct();
}

function verifCostumer(costumer) {
  const perfil = document.getElementById("perfil");
  const costumerLogin = document.getElementById("costumerLogin");
  const costumerLogout = document.getElementById("costumerLogout");
  const userLogin = document.getElementById("userLogin");
  const userLogout = document.getElementById("userLogout");

  if (perfil) {
    perfil.innerHTML = `${costumer.nomecompleto}, Cliente`;
  }

  if (costumerLogin) costumerLogin.style.display = "none";
  if (costumerLogout) {
    costumerLogout.style.display = "block";
    costumerLogout.addEventListener("click", logoutCostumer);
  }

  // esconde o login de usuário se for cliente logado
  if (userLogin) userLogin.style.display = "none";
  if (userLogout) userLogout.style.display = "none";

  listProduct();
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../pages/index.html";
}

function logoutCostumer() {
  localStorage.removeItem("loggedInCostumer");
  window.location.href = "../pages/loginCostumer.html";
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
        throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      listarProdutos(data);
    })
    .catch((err) => {
      alert("Erro ao buscar produtos: " + err.message);
    });
}

function listarProdutos(produtos) {
  let cardContainer = document.getElementById("cardContainer");
  if (!cardContainer) {
    console.error("Elemento cardContainer não encontrado!");
    return;
  }

  cardContainer.innerHTML = "";

  produtos.forEach((produto) => {
    let image;
    produto.imagens.forEach((img) => {
      if (img.padrao) {
        image = img.linkimg;
      }
    });

    let card = `
      <div class="cardExCont">
        <div class="cardEx">
          <div class="img_space">
            <figure>
              <img class="img" src="../../../../../../${image}" alt="Imagem do produto" />
            </figure>
          </div>
          <div class="rating">
            <span>${produto.avaliacao ? produto.avaliacao.toFixed(1) : "N/A"}</span> /5.0
          </div>
          <div class="productName"><p>${produto.nome}</p></div>
          <div class="productPrice">
            <p>Valor do produto: R$ <span class="price">${produto.valor ? produto.valor.toFixed(2) : "0.00"}</span></p>
          </div>
          <div class="btnCont">
            <button onclick="goDetails(${produto.id})">Detalhes</button>
          </div>
        </div>
      </div>
    `;

    cardContainer.insertAdjacentHTML("beforeend", card);
  });
}

function goDetails(id) {
  localStorage.setItem("productId", id);
  window.location.href = `./productDetails.html`;
}
