document.getElementById("leave").style.display = "none";
const voltar = document.getElementById("goBack");
const concluir = document.getElementById("finish");
const mydados = document.getElementById("myDados");
const end = document.getElementById("endereco");
const pag = document.getElementById("pag");

document.addEventListener("DOMContentLoaded", () => {
  const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));

  if (loggedInCostumer) {
    verifCostumer(loggedInCostumer);
  } else {
    document.getElementById("costumerLogin").style.display = "block";
  }

  function verifCostumer(costumer) {
    document.getElementById("leave").style.display = "block";
    const perfilC = document.getElementById("perfilC");
    const costumerLogin = document.getElementById("costumerLogin");
    const costumerLogout = document.getElementById("leaves");
    const areacostumer = document.getElementById("areaLoginCostumer");

    if (perfilC) {
      perfilC.innerHTML = `${costumer.nomecompleto}, Cliente`;
    }

    if (costumerLogin) {
      costumerLogin.style.display = "none";
      areacostumer.style.display = "block";
    }
    if (costumerLogout) {
      costumerLogout.style.display = "block";
      costumerLogout.addEventListener("click", costumerLogouts);
    }
  }

  function costumerLogouts() {
    console.log("Logout realizado com sucesso!");
    localStorage.removeItem("loggedInCostumer");
    window.location.href = "../pages/loginCostumer.html";
  }
  listarProdutos();
  listarMeusdados();
  listarEndereco();
  listarPagamento();
});

voltar.addEventListener("click", () => {
  window.location.href = "../pages/paymentScreen.html";
});

concluir.addEventListener("click", (e) => {
  e.preventDefault();
  let resumoPedido = JSON.parse(localStorage.getItem("resumoPedido"));
  fetch("http://localhost:8080/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adressID: resumoPedido.idEndereco,
      formapagamento: resumoPedido.formaPagamento,
      valorfrete: resumoPedido.frete,
      valortotalpedido: resumoPedido.total,
      produtos: JSON.parse(resumoPedido.produtos),
      costumer: JSON.parse(localStorage.getItem("loggedInCostumer")),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao realizar o pedido");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Pedido realizado com sucesso:", data);
      alert("Pedido realizado com sucesso!");
      localStorage.removeItem("carrinho");
      localStorage.removeItem("resumoPedido");
      window.location.href = "../pages/mainProductSc.html";
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao realizar o pedido. Tente novamente.");
    });
});

function listarProdutos() {
  let cartContent = document.getElementById("product-review");
  if (!cartContent) return;

  let produtos = JSON.parse(localStorage.getItem("carrinho")) || [];

  cartContent.innerHTML = "";

  produtos.forEach((produto, index) => {
    let image;
    produto.imagem.forEach((img) => {
      if (img.padrao) {
        image = img.linkimg;
      }
    });
    let precoTotal = produto.valor * produto.qtd;
    let cart = `
         <div class="product-box">
          <div class="product-img">
            <div class="img-placeholder">
              <img src="../../../../../../${image}" alt="${
      produto.nome
    }" width="100%" height="100%"/>
            </div>
          </div>
           <div class="product-details">
          <p class="product-description">Descrição do produto</p>

          <div class="product-info">
            <p class="product-price">Valor Un:${produto.valor.toFixed(2)}</p>
            <div class="product-qty">
              <span class="qty-number">Qtd:${produto.qtd}</span>
            </div>
            <p class="product-total">Preço Total:${precoTotal.toFixed(2)}</p>
          </div>
          <p class="product-total"></p>
          </div>
          <h2 class="product-name">${produto.nome}</h2>
        </div>
      </div>`;
    cartContent.insertAdjacentHTML("beforeend", cart);
  });
}

function listarMeusdados() {
  let meusDados;

  let costumer = JSON.parse(localStorage.getItem("loggedInCostumer")) || [];

  meusDados = `
        <div class="dados">
            <h4>Nome: ${costumer.nomecompleto}</h4>
            <h4>Email: ${costumer.email}</h4>
            <h4>CPF: ${costumer.cpf}</h4>
        </div>`;
  mydados.insertAdjacentHTML("beforeend", meusDados);
}

function listarEndereco() {
  let id = localStorage.getItem("resumoPedido");
  let idPedido = JSON.parse(id);

  fetch("http://localhost:8080/adress/def/" + idPedido.idEndereco)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        renderizarEndereco(data);
      } else {
        console.error("Endereço não encontrado.");
      }
    })
    .catch((error) => console.error("Erro ao buscar endereço:", error));
}

function renderizarEndereco(endereco) {
  console.log("Endereço:", endereco);
  local = `<div class="dados">
            <h4>Logradouro: ${endereco.logradouro}</h4>
            <h4>Bairro: ${endereco.bairro}</h4>
            <h4>Número: ${endereco.numero}</h4>
            <h4>CEP: ${endereco.cep}</h4>`;
  end.insertAdjacentHTML("beforeend", local);
}

function listarPagamento() {
  let pagamentoCp = localStorage.getItem("resumoPedido");
  if (!pagamentoCp) return; // se não tiver nada no localStorage

  let resumoPedido = JSON.parse(pagamentoCp);

  let pagamento = resumoPedido.formaPagamento;
  let linha = `<p>Forma de pagamento: ${pagamento}</p>`;
  pag.insertAdjacentHTML("beforeend", linha);

  if (pagamento === "cartao") {
    let cartao = resumoPedido.cartao;
    console.log("Cartão:", cartao);
    let linhaCartao = `<p>Cartão: ${cartao.numero}</p>`;
    pag.insertAdjacentHTML("beforeend", linhaCartao);
  }
}
