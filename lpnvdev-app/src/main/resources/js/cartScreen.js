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
            let verifItem = document.getElementById("noItem");
            verifItem.style.display = "none";
        })
        .catch((err) => {
            alert("Erro ao buscar produtos: " + err.message);
        });
}

function listarProdutos(produtos) {
    let cartContent = document.getElementById("cartAndSummary");
    if (!cartContent) {
        console.error("Elemento cartAndSummary não encontrado!");
        return;
    }

    cartContent.innerHTML = "";

    produtos.forEach((produto) => {
        let cart = `
       <div id="cartContent">
        <div class="imgArea"></div>
        <div class="productNamePrice">
            <h4 id="prodName"><span>${produto.nome}</span></h4>
            <h4 id="prodPrice">R$ <span>${produto.valor ? produto.valor.toFixed(2) : "0.00"}</span></h4>
        </div>
        <div class="quantity">
            <h4>Quant.</h4>
            <div class="qntNumber">
                <p><</p><span id="qntNumber"></span><p>></p>
            </div>
        </div>
        <div class="removeItembtn">
            <div class="border">
                <img src="../img/cartScreen/lixo.png" alt="Remover" />
                <button id="removeItem">Remover Item</button>
            </div>
        </div>
    </div>
    </div>
        `;

        cartContent.insertAdjacentHTML("beforeend", cart);
    });

    let summaryCepContainer = `
    <div id="summaryCepContainer">
        <div class="summaryArea">
            <div class="summaryTitle">
                <h3>Resumo do Pedido</h3>
            </div>
            <div class="summaryContent">
                <div class="subTotal">
                    <h4>Valor dos produtos:  R$ <span id="subTotal"></span></h4>
                </div>
                <div class="frete">
                    <h4>Frete:  R$ <span id="frete"></span></h4>
                </div>
                <div class="total">
                    <h4>Total:  R$ <span id="total"></span></h4>
                </div>
            </div>
        </div>

        <div class="cepArea">
            <div class="cepTitle">
                <h3>CEP</h3>
            </div>
            <div class="cepContent">
                <input type="text" id="cep"/>
                <button id="cepButton">OK</button>
                <div class="frete-options">
                    <label>
                      <input type="radio" name="frete" value="15.99">
                      <span>R$15,99 - SEDEX - 3 dias úteis</span>
                    </label>
                    <label>
                      <input type="radio" name="frete" value="5.99">
                      <span>R$5,99 - SENAC - 10 dias úteis</span>
                    </label>
                    <label>
                      <input type="radio" name="frete" value="56.90">
                      <span>R$56,90 - FAST - Em até duas horas</span>
                    </label>
                </div>
            </div>
        </div>
    </div>`;

    cartContent.insertAdjacentHTML("beforeend", summaryCepContainer);

   
}

document.addEventListener("DOMContentLoaded", () => {
    verifUser();
});
 