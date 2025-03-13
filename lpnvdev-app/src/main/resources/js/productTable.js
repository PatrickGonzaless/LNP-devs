const form = document.querySelector("form");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");
const tabela = document.querySelector("table");
const add = document.getElementById("newprod-button");
let numPage = document.getElementById("numPage");
let currentPage = 1;
const itemsPerPage = 10;
let produtosFiltrados = null;

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const perfil = document.getElementById("perfil");
let searchTerm = "";

window.onload = function () {
  perfil.innerHTML = `${loggedInUser.username}, ${loggedInUser.grupo}`;
  if (
    !(loggedInUser.grupo === "Administrador") &&
    !(loggedInUser.grupo === "Adm")
  ) {
    add.style.display = "none";
  }
  searchTerm = searchInput.value.trim();
  listProduct(searchTerm);
};

function addProduto() {
  window.location.href = "../pages/registerProduct.html";
}

function listProduct(searchTerm = "") {
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
    .then((data) => {
      listarProdutos(data, searchTerm);
    })
    .catch((err) => {
      alert("Erro ao buscar produtos: " + err.message);
    });
}

function listarProdutos(produtos, searchTerm = "") {
  let tbody = tabela.querySelector("tbody");
  if (!tbody) {
    tbody = document.createElement("tbody");
    tabela.appendChild(tbody);
  }

  tbody.innerHTML = "";

  produtosFiltrados = searchTerm
    ? produtos.filter((produto) => {
        const nome = produto.nome.toLowerCase();
        return nome.includes(searchTerm.toLowerCase());
      })
    : produtos;

  if (searchTerm && produtosFiltrados.length === 0) {
    alert("Nenhum produto encontrado com esse nome.");
    return;
  }
  let totalPages;
  if (produtosFiltrados % 10 == 0) {
    totalPages = parseInt(produtosFiltrados.length / 10);
  } else {
    totalPages = parseInt(produtosFiltrados.length / 10) + 1;
  }
  numPage.innerHTML = `${currentPage} ... ${totalPages}`;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const itemsToDisplay = produtosFiltrados
    .reverse()
    .slice(startIndex, endIndex);
  itemsToDisplay.forEach((produto) => {
    if (
      loggedInUser.grupo === "Administrador" ||
      loggedInUser.grupo === "Adm"
    ) {
      let linha = `
        <tr>
          <td>${produto.id}</td>
          <td>${produto.nome}</td>
          <td>${produto.qtd}</td>
          <td>${produto.valor}</td>
          <td>${produto.stats}</td>
          <td>
              <button class="alterarbtn" onclick='alterarProduto(${JSON.stringify(
                produto
              )})'>Alterar</button>
              <button class="visualizarbtn" onclick='openModal(${JSON.stringify(
                produto
              )})'>Visualizar</button>
              <input class="checkbtn" onclick='alteraStatus(${JSON.stringify(
                produto
              )})' type = "checkbox" ${produto.stats ? "checked" : ""}>${
        produto.stats ? "Ativo" : "Inativo"
      }</input>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", linha);
    } else {
      let linha = `
        <tr>
          <td>${produto.id}</td>
          <td>${produto.nome}</td>
          <td>${produto.qtd}</td>
          <td>${produto.valor}</td>
          <td>${produto.stats}</td>
          <td>
              <button class="alterarbtn" onclick='alterarProduto(${JSON.stringify(
                produto
              )})'>Alterar</button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", linha);
    }
  });
  tabela.style.display = "table";
}

function alterarProduto(produto) {
  localStorage.setItem("alterProd", JSON.stringify(produto));
  window.location.href = "../pages/registerProduct.html";
}
function alteraStatus(produto) {
  if (!confirm("Deseja realmente alterar o status deste produto?")) {
    return;
  }
  fetch("http://localhost:8080/product", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      id: produto.id,
      nome: produto.nome,
      qtd: produto.qtd,
      valor: produto.valor,
      avaliacao: produto.avaliacao,
      descricao: produto.descricao,
      stats: !produto.stats,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Erro na requisição: ${res.status} - ${res.statusText}`
        );
      }
      return res.json();
    })
    .then((data) => {
      alert("produto alterado com sucesso!", data);
      listProduct();
    })
    .catch((err) => {
      console.error("Erro ao alterar produto!", err);
    });
}

// Função para navegar para a próxima página
function nextPage() {
  if (currentPage > 0) {
    let btnPrev = document.getElementById("prevbtn");
    btnPrev.style.display = "flex";
  }
  if (currentPage * itemsPerPage < produtosFiltrados.length) {
    currentPage++;
    listProduct(searchTerm);
  }
  if (currentPage * itemsPerPage > produtosFiltrados.length) {
    let btnProx = document.getElementById("nextbtn");
    btnProx.style.display = "none";
  }
}

function previousPage() {
  let btnProx = document.getElementById("nextbtn");
  btnProx.style.display = "flex";
  if (currentPage > 1) {
    currentPage--;
    listProduct(searchTerm);
  }
  if (currentPage === 1) {
    let btnPrev = document.getElementById("prevbtn");
    btnPrev.style.display = "none";
  }
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  searchTerm = searchInput.value.trim();
  listProduct(searchTerm);
});
searchInput.addEventListener("input", (event) => {
  event.preventDefault();
  searchTerm = searchInput.value.trim();
  listProduct(searchTerm);
});

function openModal(produto) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-title").innerText =
    produto.nome || "Nome não disponível";
  document.getElementById("modal-description").innerText =
    produto.descricao || "Sem descrição disponível";

  let precoFormatado = produto.valor
    ? produto.valor.toFixed(2)
    : "Preço não disponível";
  document.getElementById("modal-price").innerText =
    precoFormatado || "Preço não disponível";

  document.getElementById("modal-quantity").innerText =
    produto.qtd || "Quantidade não disponível";

  let avaliacaoFormatada = produto.avaliacao
    ? produto.avaliacao.toFixed(1)
    : "Preço não disponível";
  document.getElementById("modal-rating").innerText =
    avaliacaoFormatada || "Avaliação não disponível";

  // const imagePlaceholder = document.querySelector(".image-placeholder");
  // if (produto.imagem) {
  //   imagePlaceholder.style.backgroundImage = `url(${produto.imagem})`;
  //   imagePlaceholder.style.backgroundSize = 'cover';
  // } else {
  //   imagePlaceholder.style.backgroundImage = 'none';
  // }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onclick = function (event) {
  if (event.target == document.getElementById("modal")) {
    closeModal();
  }
};
