const form = document.querySelector("form");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");
const closeButton = document.getElementById("close-btn");
const tabela = document.querySelector("table");
const lupaIcon = document.getElementById("lupa");
const loggedEmail = JSON.parse(localStorage.getItem("loggedInUser")).email;

window.onload = () => {
  const searchTerm = searchInput.value.trim();
  listUser(searchTerm);
};

function listUser(searchTerm = "") {
  fetch(`http://localhost:8080/users`, {
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
      console.log("Usuários carregados:", data);
      listarUsuarios(data, searchTerm);
    })
    .catch((err) => {
      alert("Erro ao buscar usuários: " + err.message);
    });
}

function listarUsuarios(usuarios, searchTerm = "") {
  let tbody = tabela.querySelector("tbody");
  if (!tbody) {
    tbody = document.createElement("tbody");
    tabela.appendChild(tbody);
  }

  tbody.innerHTML = "";

  const usuariosFiltrados = searchTerm
    ? usuarios.filter((usuario) => {
        const nomeCompleto = usuario.username.toLowerCase();
        return nomeCompleto.includes(searchTerm.toLowerCase());
      })
    : usuarios;

  if (searchTerm && usuariosFiltrados.length === 0) {
    alert("Nenhum usuário encontrado com esse nome.");
    return;
  }

  usuariosFiltrados.forEach((usuario) => {
    let linha = `
        <tr>
          <td class="clickable" onclick='alterarUsuario(${JSON.stringify(
            usuario
          )})'>${usuario.username}</td>
          <td>${usuario.email}</td>
          <td class="clickable" value="${
            usuario.id
          }" onclick='alteraStatus(${JSON.stringify(usuario)})'>${
      usuario.stats ? "Ativo" : "Inativo"
    }</td>
          <td>${usuario.grupo || "Sem grupo"}</td>
        </tr>
      `;
    tbody.insertAdjacentHTML("beforeend", linha);
  });
  lupaIcon.style.display = "none";
  tabela.style.display = "table";
  closeButton.style.display = "block";
}

function alteraStatus(usuario) {
  if (usuario.email === loggedEmail) {
    alert("Você não pode alterar o seu próprio status!");
    return;
  }
  if (!confirm("Deseja realmente alterar o status deste usuário?")) {
    return;
  }
  fetch("http://localhost:8080/users", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      id: usuario.id,
      username: usuario.username,
      cpf: usuario.cpf,
      email: usuario.email,
      grupo: usuario.grupo,
      senha: usuario.senha,
      stats: !usuario.stats,
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
      alert("Usuário alterado com sucesso!", data);
      listUser();
    })
    .catch((err) => {
      console.error("Erro ao alterar usuário!", err);
    });
}

function alterarUsuario(user) {
  localStorage.setItem("userToAlter", JSON.stringify(user));
  window.location.href = "../pages/register.html";
}

function closeUsersList() {
  const tbody = tabela.querySelector("tbody");
  if (tbody) tbody.innerHTML = "";
  tabela.style.display = "none";
  closeButton.style.display = "none";
  lupaIcon.style.display = "block";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  listUser();
});

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  listUser(searchTerm);
});
searchInput.addEventListener("input", function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  listUser(searchTerm);
});

closeButton.addEventListener("click", closeUsersList);
