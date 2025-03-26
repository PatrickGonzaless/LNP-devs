let id = localStorage.getItem("productId");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const comprarBtn = document.getElementById("buyButton");           

       

function verifUser() {
    if (loggedInUser) {
        const perfil = document.getElementById("perfil");
        const userLogin = document.getElementById("userLogin");
        const userLogout = document.getElementById("userLogout");

        if (perfil) perfil.innerHTML = `${loggedInUser.username}, ${loggedInUser.grupo}`;
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
                throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
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
            console.log("Produto encontrado:", produto);
            
            document.getElementById("productName").innerText = produto.nome || "Nome não disponível";
            document.getElementById("descriptionArea").innerText = produto.descricao || "Sem descrição disponível";

            let precoFormatado = produto.valor ? ` ${produto.valor.toFixed(2)}` : "Preço não disponível";
            document.getElementById("priceArea").innerText = precoFormatado;

            let avaliacaoFormatada = produto.avaliacao ? produto.avaliacao.toFixed(1) : "Sem avaliação";
            document.getElementById("rateArea").innerText = avaliacaoFormatada;

            // document.getElementById("produtoImagem").src = produto.imagem || "";
            // document.getElementById("produtoImagem").alt = produto.nome || "Imagem do produto";

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
            imagem: produto.imagem,
        });

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        // alert("Produto adicionado ao carrinho!");
    } else {
        // alert("Este produto já está no carrinho.");
    }

    window.location.href = "../pages/cartScreen.html";
}

document.addEventListener("DOMContentLoaded", () => {
    verifUser();
});
