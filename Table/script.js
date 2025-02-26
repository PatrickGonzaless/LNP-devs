const form = document.querySelector("form");
const Iusername = document.querySelector(".username");
const Icpf = document.querySelector(".cpf");
const Iemail = document.querySelector(".email");
const Sgrupo = document.querySelector(".grupo");
const stats = true;

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
        alert("Erro ao buscar usuários", err);
    });
}

function listarUsuarios(usuarios, searchTerm = "") {
    const tabela = document.querySelector("table");
    let tbody = tabela.querySelector("tbody");
    if (!tbody) {
        tbody = document.createElement("tbody");
        tabela.appendChild(tbody);
    }

    tbody.innerHTML = "";
    
    const usuariosFiltrados = searchTerm ? usuarios.filter(usuario => {
        const nomeCompleto = usuario.username.toLowerCase();
        const partesNome = nomeCompleto.split(" ");
        return nomeCompleto === searchTerm.toLowerCase() || partesNome[0] === searchTerm.toLowerCase();
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
                <td>${usuario.stats}</td>
                <td>${usuario.grupo || "Sem grupo"}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", linha);
    });

    document.getElementById("lupa").style.display = "none";
    tbody.style.display = "table-row-group";
    document.getElementById("close-btn").style.display = "block";
}

function closeUsersList() {
    const tabela = document.querySelector("tbody");
    tabela.style.display = "none";
    document.getElementById("close-btn").style.display = "none";
}

function clean() {
    if (Iusername) Iusername.value = "";
    if (Icpf) Icpf.value = "";
    if (Iemail) Iemail.value = "";
    if (Sgrupo) Sgrupo.value = "";
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    listUser();
    clean();
});

document.getElementById("search-button").addEventListener("click", function(event) {
    event.preventDefault(); 
    const searchTerm = document.getElementById("search").value.trim();
    listUser(searchTerm);
});
