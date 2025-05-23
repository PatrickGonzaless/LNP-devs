document.getElementById("leave").style.display = "none";
const loggedInCostumer = JSON.parse(localStorage.getItem("loggedInCostumer"));
const btnCheck = document.getElementById("okCheck");

document.addEventListener("DOMContentLoaded", () => {
  if (loggedInCostumer) {
    controlaCarrinho();
    
  } else {
    document.getElementById("costumerLogin").style.display = "block";
    listarProdutos();
  }
  try {
    calcularFrete();
  } catch (erro) { }
});

function verifCostumer(costumer) {
  const perfilC = document.getElementById("perfilC");
  const costumerLogin = document.getElementById("costumerLogin");
  const costumerLogout = document.getElementById("leaves");
  const areacostumer = document.getElementById("areaLoginCostumer");
  document.getElementById("removeAllcontainer").style.display = "block";
  document.getElementById("leave").style.display = "block";

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

  listarProdutos();
}

function costumerLogouts() {
  console.log("Logout realizado com sucesso!");
  localStorage.removeItem("loggedInCostumer");
  localStorage.removeItem("carrinho");
  window.location.href = "../pages/loginCostumer.html";
}

function listarProdutos() {
  let cartContent = document.getElementById("cartAndSummary");
  if (!cartContent) return;

  let produtos = JSON.parse(localStorage.getItem("carrinho")) || [];

  const footer = document.getElementById("footer");

  if (produtos.length === 0) {
    document.getElementById("noItem").style.display = "block";
    footer.style.marginTop = "0";
    return;
  } else {
    document.getElementById("noItem").style.display = "none";
    footer.style.marginTop = "30vh";
  }

  cartContent.innerHTML = "";

  produtos.forEach((produto, index) => {
    let image;
    console.log(produto);
    produto.imagem.forEach((img) => {
      if (img.padrao) {
        image = img.linkimg;
      }
    });
    let cart = `
       <div id="cartContent">
        <div class="imgArea">
            <img src="../../../../../../${image}" alt="${produto.nome
      }" width="100%" height="100%"/>
        </div>
        <div class="productNamePrice">
            <h4 id="prodName"><span>${produto.nome}</span></h4>
            <h4 id="prodPrice">R$ <span>${produto.valor.toFixed(2)}</span></h4>
        </div>
        <div class="quantity">
            <h4>Quant.</h4>
            <div class="qntNumber">
                <p style="cursor:pointer" onclick="reduzQtd(${produto.id
      })"><</p><span id="${produto.id}">${produto.qtd
      }</span><p style="cursor:pointer" onclick="aumentaQtd(${produto.id})">></p>
            </div>
        </div>
        <div class="removeItembtn">
            <div class="border">
                <img src="../img/cartScreen/lixo.png" alt="Remover" onclick="removerProduto(${index})" />
                <button id="removeItem" onclick="removerProduto(${index})">Remover Item</button>
            </div>
        </div>
    </div>`;
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
                <button onclick="checkOK()" id="cepButton">OK</button>
                <div class="frete-options" style="display: ${localStorage.getItem("frete")
      ? localStorage.getItem("frete")
      : "none"
    }">
                    <label>
                      <input onclick="calcularFrete()" type="radio" name="frete" value="15.99" ${localStorage.getItem("frete") == 15.99 ? "checked" : ""
    }>
                      <span>R$15,99 - SEDEX - 3 dias úteis</span>
                    </label>
                    <label>
                      <input onclick="calcularFrete()" type="radio" name="frete" value="5.99"${localStorage.getItem("frete") == 5.99 ? "checked" : ""
    }>
                      <span>R$5,99 - SENAC - 10 dias úteis</span>
                    </label>
                    <label>
                      <input onclick="calcularFrete()" type="radio" name="frete" value="56.90"${localStorage.getItem("frete") == 56.9 ? "checked" : ""
    }>
                      <span>R$56,90 - FAST - Em até duas horas</span>
                    </label>
                </div>
            </div>
        </div>
    </div>`;

  cartContent.insertAdjacentHTML("beforeend", summaryCepContainer);

  adicionarResumoPedido();
}

function checkOK() {
  let cep = document.getElementById("cep").value;
  if (cep.length != 8) {
    alert("CEP inválido");
  } else {
    document.querySelector(".frete-options").style.display = "block";
  }
  adicionarResumoPedido();
}

function removerProduto(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  listarProdutos();
  window.location.reload();
  document.getElementById("noItem").style.display = "block";
}

document.getElementById("removeAll").addEventListener("click", () => {
  localStorage.removeItem("carrinho");
  listarProdutos();
  document.getElementById("noItem").style.display = "block";

  window.location.reload();
});

function adicionarResumoPedido() {
  let produtos = JSON.parse(localStorage.getItem("carrinho")) || [];
  let subTotal = produtos.reduce(
    (acc, produto) =>
      acc +
      produto.valor *
      parseInt(document.getElementById(`${produto.id}`).innerText),
    0
  );
  document.getElementById("subTotal").innerText = subTotal.toFixed(2);
  localStorage.setItem("subTotal", subTotal);
  try {
    subTotal += localStorage.getItem("frete")
      ? parseFloat(localStorage.getItem("frete"))
      : 0;
  } catch (erro) { }
  document.getElementById("frete").innerText = localStorage.getItem("frete")
    ? localStorage.getItem("frete")
    : "none";
  document.getElementById("total").innerText = subTotal.toFixed(2);
  localStorage.setItem("total", subTotal);
}

function calcularFrete() {
  let produtos = JSON.parse(localStorage.getItem("carrinho")) || [];
  let subTotal = produtos.reduce((acc, produto) => acc + produto.valor, 0);
  try {
    let frete = parseFloat(
      document.querySelector(".frete-options input[type='radio']:checked").value
    );
    subTotal += frete;
    document.getElementById("frete").innerText = frete.toFixed(2);
    localStorage.setItem("frete", frete);
    btnCheck.disabled = false;
  } catch (error) {
    console.log("Nenhum frete selecionado.");
  }
  document.getElementById("total").innerText = subTotal.toFixed(2);
}

function reduzQtd(id) {
  let quantidade = document.getElementById(`${id}`);
  let valor = parseInt(quantidade.innerText);
  if (valor > 1) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const produtoExiste = carrinho.find((item) => item.id === id);
    carrinho.splice(
      carrinho.findIndex((item) => item.id === id),
      1
    );
    produtoExiste.qtd -= 1;
    carrinho.push(produtoExiste);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    calcularFrete();
    adicionarResumoPedido();
    window.location.reload();
  }
}

function aumentaQtd(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const produtoExiste = carrinho.find((item) => item.id === id);
  carrinho.splice(
    carrinho.findIndex((item) => item.id === id),
    1
  );
  produtoExiste.qtd += 1;
  carrinho.push(produtoExiste);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  calcularFrete();
  adicionarResumoPedido();
  window.location.reload();
}

btnCheck.addEventListener("click", () => {
  adicionarResumoPedido();
  if (loggedInCostumer) {
    window.location.href = "../pages/checkoutScreen.html";
  } else {
    window.location.href = "../pages/loginCostumer.html?logged=true";
  }
});

async function salvarCarrinho() {
  let produtos = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (produtos.length === 0) {
    localStorage.setItem("carrinho", JSON.stringify([]));
  } else {
    let id = loggedInCostumer.id;
    await fetch(`http://localhost:8080/cart/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(
            `Erro na requisição: ${res.status} - ${res.statusText}`
          );
        }
        return res.json();
      }).then((data) => {
        console.log("Carrinho deletado com sucesso!", data);
      });

    for (let produto of produtos) {
      let carrinho = {
        id_cliente: loggedInCostumer,
        id_produto: produto,
        qtd: produto.qtd,
      };
      await fetch(`http://localhost:8080/cart`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(carrinho),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `Erro na reqasdasdauisição: ${res.status} - ${res.statusText}`
            );
          }
          return res.json();
        })
        .then((data) => {
          console.log("Carrinho salvo com sucesso!", data);
          let carrinhoBD = localStorage.getItem("carrinhoDb");
          carrinhoBD = JSON.parse(carrinhoBD);
          carrinho.push(pedido);
          localStorage.setItem("carrinhoDb", JSON.stringify(carrinho));
        })
        .catch((err) => {
          console.log("Erro ao salvar carrinho: " + err.message);
        });
    }
    verifCostumer(loggedInCostumer);
  }
}

async function controlaCarrinho() {
  let id = loggedInCostumer.id;
  await fetch(`http://localhost:8080/cart/${id}`, {
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
      console.log("Carrinho recuperado com sucesso!", data);
      let carrinhoBD = [];
      for (let pedido of data) {
        if (pedido.id_cliente.id == loggedInCostumer.id) {
          carrinhoBD.push(pedido);
        }
      }
      localStorage.setItem("carrinhoDb", JSON.stringify(carrinhoBD));
      let produtos = JSON.parse(localStorage.getItem("carrinho")) || [];
      let produtosBD = JSON.parse(localStorage.getItem("carrinhoDb")) || [];
      for (let produto of produtosBD) {
        let produtoExistente = produtos.find((p) => p.id === produto.id_produto.id);
        if (produtoExistente) {
          produtoExistente.qtd += produto.qtd;
        } else {
          produtos.push({
            // id: produto.id_produto.id,
            // nome: produto.id_produto.nome,
            // valor: produto.id_produto.valor,
            // qtd: produto.qtd,
            // imagem: produto.id_produto.imagem,
            produto
          });
        }
      }
      localStorage.setItem("carrinho", JSON.stringify(produtos));
      salvarCarrinho();
    })
    .catch((err) => {
      //salvarCarrinho();
      console.log("Erro ao recuperar carrinho: " + err.message);
    });
}
