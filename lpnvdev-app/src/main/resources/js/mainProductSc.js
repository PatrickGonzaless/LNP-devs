const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

function verifUser() {

    if (loggedInUser) {
        const perfil = document.getElementById("perfil");
        const userLogin = document.getElementById("userLogin");
        const userLogout = document.getElementById("userLogout");

        if (perfil) {
            perfil.innerHTML = `${loggedInUser.username}, ${loggedInUser.grupo}`;
        }

        if (userLogin) userLogin.style.display = "none";
        if (userLogout) userLogout.style.display = "block";

        const logoutButton = document.getElementById("userLogout");
        if (logoutButton) {
            logoutButton.addEventListener("click", logout);
        }
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
        let card = `
        <div class="cardExCont">
            <div class="cardEx">
                <div class="img_space">
                    <div class="rating">
                        <span>${produto.avaliacao ? produto.avaliacao.toFixed(1) : "N/A"}</span> /5.0
                    </div>
                </div>
                <div class="productName"><p>${produto.nome}</p></div>
                <div class="productPrice">
                    <p>Valor do produto: R$ <span class="price">${produto.valor ? produto.valor.toFixed(2) : "0.00"}</span></p>
                </div>
                <div class="btnCont">
                    <a href="../pages/productDetails.html"><button>Detalhes</button></a>
                </div>
            </div>
        </div>
        `;

        cardContainer.insertAdjacentHTML("beforeend", card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    verifUser();
});
 