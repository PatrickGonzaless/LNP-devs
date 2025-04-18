let id = localStorage.getItem("productId");
const comprarBtn = document.getElementById("buyButton");

document.addEventListener("DOMContentLoaded", () => {
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));
  listProduct();

  console.log("loggedInCostumer:", loggedInCostumer);

  if (loggedInCostumer) {
    verifCostumer(loggedInCostumer);
  } else {
    document.getElementById("costumerLogin").style.display = "block";
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
    .then((produtos) => {
      fillInformation(produtos);
    })
    .catch((err) => {
      alert("Erro ao buscar produtos: " + err.message);
    });
}

function fillInformation(produtos) {
  produtos.forEach((produto) => {
    if (produto.id == id) {
      document.getElementById("productName").innerText =
        produto.nome || "Nome não disponível";
      document.getElementById("descriptionArea").innerText =
        produto.descricao || "Sem descrição disponível";

      let precoFormatado = produto.valor
        ? ` ${produto.valor.toFixed(2)}`
        : "Preço não disponível";
      document.getElementById("priceArea").innerText = precoFormatado;

      let avaliacaoFormatada = produto.avaliacao
        ? produto.avaliacao.toFixed(1)
        : "Sem avaliação";
      document.getElementById("rateArea").innerText = avaliacaoFormatada;

      let lista = document.getElementById("listaCarrossel");
      let images = document.getElementById("imagesCarrosel");
      let i = 0;
      produto.imagens.forEach((imagem) => {
        // Indicadores
        const li = `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" ${
          i === 0 ? 'class="active"' : ""
        }></li>`;
        lista.insertAdjacentHTML("beforeend", li);

        // Imagens
        const item = `
        <div class="carousel-item ${imagem.padrao ? "active" : ""}">
          <img class="d-block w-100" src="../../../../../${
            imagem.linkimg
          }" alt="Slide ${i + 1}" />
        </div>`;
        images.insertAdjacentHTML("beforeend", item);
        i++;
      });

      comprarBtn.addEventListener("click", () => adicionarAoCarrinho(produto));
    }
  });
}

function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const produtoExiste = carrinho.find((item) => item.id === produto.id);
  if (!produtoExiste) {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      valor: produto.valor,
      imagem: produto.imagens,
      qtd: 1,
    });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    // alert("Produto adicionado ao carrinho!");
  } else {
    carrinho.splice(
      carrinho.findIndex((item) => item.id === produto.id),
      1
    );
    produtoExiste.qtd += 1;
    carrinho.push(produtoExiste);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
  window.location.href = "../pages/cartScreen.html";
}

document.addEventListener("DOMContentLoaded", () => {
  verifUser();
});
