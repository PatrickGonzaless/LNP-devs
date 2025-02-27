const form = document.querySelector("form");
const Iusername = document.querySelector(".username");
const Icpf = document.querySelector(".cpf");
const Iemail = document.querySelector(".email");
const Sgrupo = document.querySelector(".grupo");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");
const closeButton = document.getElementById("close-btn");
const tabela = document.querySelector("table");
const lupaIcon = document.getElementById("lupa");

function listUser(searchTerm = "") {
    fetch(`http://localhost:8080/users`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    })
    .then(data => {
        console.log("Usuários carregados:", data);
        listarUsuarios(data, searchTerm);
    })
    .catch(err => {
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
    
    const usuariosFiltrados = searchTerm ? usuarios.filter(usuario => {
        const nomeCompleto = usuario.username.toLowerCase();
        return nomeCompleto.includes(searchTerm.toLowerCase());
    }) : usuarios;

    if (searchTerm && usuariosFiltrados.length === 0) {
        alert("Nenhum usuário encontrado com esse nome.");
        return;
    }

    usuariosFiltrados.forEach(usuario => {
        console.log(usuario);
        let linha = `
            <tr>
                <td>${usuario.username}</td>
                <td>${usuario.email}</td>
                <td>${usuario.stats ? 'Ativo' : 'Inativo'}</td>
                <td>${usuario.grupo || "Sem grupo"}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", linha);
    });

    lupaIcon.style.display = "none";
    tabela.style.display = "table";
    closeButton.style.display = "block";
}

function closeUsersList() {
    const tbody = tabela.querySelector("tbody");
    if (tbody) tbody.innerHTML = "";
    tabela.style.display = "none";
    closeButton.style.display = "none";
    lupaIcon.style.display = "block";
}

function clean() {
    if (Iusername) Iusername.value = "";
    if (Icpf) Icpf.value = "";
    if (Iemail) Iemail.value = "";
    if (Sgrupo) Sgrupo.value = "";
    if (searchInput) searchInput.value = "";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    listUser();
    clean();
});

searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    listUser(searchTerm);
});

closeButton.addEventListener("click", closeUsersList);
