document.addEventListener("DOMContentLoaded", () => {
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));
  listProduct();

  console.log('loggedInCostumer:', loggedInCostumer);

  if (loggedInCostumer) {
    verifCostumer(loggedInCostumer);
  } else {
    document.getElementById("costumerLogin").style.display = "block";
    listProduct();
  }
});

function verifCostumer(costumer) {
  const perfilC = document.getElementById("perfilC");
  const costumerLogin = document.getElementById("costumerLogin");
  const costumerLogout = document.getElementById("leaves");
  const areacostumer = document.getElementById("areaLoginCostumer");

  if (perfilC) {
    perfilC.innerHTML = `${costumer.nomecompleto}, Cliente`;
  }

  if (costumerLogin){
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
        throw new Error(`Erro na reqasdasdauisição: ${res.status} - ${res.statusText}`);
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
