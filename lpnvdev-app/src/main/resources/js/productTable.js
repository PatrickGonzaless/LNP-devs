const form = document.querySelector("form");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");
const tabela = document.querySelector("table");
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
    const add = document.getElementById("newprod-button");
    add.style.display = "none";
  }
  searchTerm = searchInput.value.trim();
  listProduct(searchTerm);
};

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
      console.log("Produtos carregados:", data);
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
          <td>${produto.cod}</td>
          <td>${produto.nome}</td>
          <td>${produto.qtd}</td>
          <td>${produto.valor}</td>
          <td>${produto.stats}</td>
          <td>
              <button>Alterar</button>
              <button>Visualizar</button>
              <input type = "checkbox">${
                produto.stats ? "Ativo" : "Inativo"
              }</input>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", linha);
    } else {
      let linha = `
        <tr>
          <td>${produto.cod}</td>
          <td>${produto.nome}</td>
          <td>${produto.qtd}</td>
          <td>${produto.valor}</td>
          <td>${produto.stats}</td>
          <td>
              <button>Alterar</button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("afterbegin", linha);
    }
  });
  tabela.style.display = "table";
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
      cod: produto.username,
      nome: produto.cpf,
      qtd: produto.email,
      valor: produto.grupo,
      avaliacao: produto.senha,
      descricao: produto.senha,
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
  if (currentPage * itemsPerPage < produtosFiltrados.length) {
    currentPage++;
    listProduct(searchTerm);
  }
}

// Função para navegar para a página anterior
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    listProduct(searchTerm);
  }
}
