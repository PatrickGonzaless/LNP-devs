let id = localStorage.getItem("productId");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const comprarBtn = document.getElementById("buyButton");

function verifUser() {
  if (loggedInUser) {
    const perfil = document.getElementById("perfil");
    const userLogin = document.getElementById("userLogin");
    const userLogout = document.getElementById("userLogout");

    if (perfil)
      perfil.innerHTML = `${loggedInUser.username}, ${loggedInUser.grupo}`;
    if (userLogin) userLogin.style.display = "none";
    if (userLogout) userLogout.style.display = "block";

    const logoutButton = document.getElementById("userLogout");
    if (logoutButton) logoutButton.addEventListener("click", logout);
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
