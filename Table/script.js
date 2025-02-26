const form = document.querySelector("form");
const Iusername = document.querySelector(".username");
const Icpf = document.querySelector(".cpf");
const Iemail = document.querySelector(".email");
const Sgrupo = document.querySelector(".grupo");
const stats = true;

function listUser() {
    fetch("http://localhost:8080/users", {
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
        listarUsuarios(data);
    })
    .catch(err => {
        console.error("Erro ao buscar usuários:", err);
    });
}

function listarUsuarios(usuarios) {
    const tabela = document.querySelector("table");
    

    let tbody = tabela.querySelector("tbody");
    if (!tbody) {
        tbody = document.createElement("tbody");
        tabela.appendChild(tbody);
    }

    tbody.innerHTML = ""; 
    usuarios.forEach(usuario => {
        let linha = `
            <tr>
                <td>${usuario.username}</td>
                <td>${usuario.email}</td>
                 <td>${usuario.stats}</td>
                <td>${usuario.Sgrupo}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", linha);


    });
        document.getElementById("lupa").style.display = "none";
        const tebody = document.querySelector("tbody");
        tebody.style.display = "table-row-group";
        document.getElementById("close-btn").style.display = "block";   
    
}

function closeUsersList()  {
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
