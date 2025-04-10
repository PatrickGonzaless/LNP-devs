document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const Inome = document.querySelector(".prodname");
  const Ivalor = document.querySelector(".preco");
  const Iqtd = document.querySelector(".qntd");
  const Idescricao = document.querySelector(".descricao");
  const Iavaliacao = document.querySelector(".avaliacao");
  const BtnAddImg = document.getElementById("btn-container");
  const BtnCancel = document.getElementById("cancel");
  const input = document.getElementById("imagem");
  let alterImg;
  const select = document.getElementById("PrincipalImage");
  select.parentNode.style.display = "none";
  select.style.display = "none";
  let formData = new FormData();
  let numImage = 0;
  let stats = true;
  const alterProd = JSON.parse(localStorage.getItem("alterProd"));
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (alterProd) {
    Inome.value = alterProd.nome;
    Ivalor.value = alterProd.valor;
    Iqtd.value = alterProd.qtd;
    Idescricao.value = alterProd.descricao;
    Iavaliacao.value = alterProd.avaliacao;
    addImagens();
    if (
      !(loggedInUser.grupo === "Administrador") &&
      !(loggedInUser.grupo === "Adm")
    ) {
      Inome.disabled = true;
      Inome.style.backgroundColor = "gray";
      Ivalor.disabled = true;
      Ivalor.style.backgroundColor = "gray";
      Idescricao.disabled = true;
      Idescricao.style.backgroundColor = "gray";
      Iavaliacao.disabled = true;
      Iavaliacao.style.backgroundColor = "gray";
      BtnAddImg.style.display = "none";
    }
  }

  function validateForm() {
    if (Inome.value.trim() === "") {
      alert("Nome do produto é obrigatório.");
      return false;
    }
    if (Ivalor.value.trim() === "") {
      alert("Preço do produto é obrigatório.");
      return false;
    }
    if (Iqtd.value.trim() === "") {
      alert("Quantidade do produto é obrigatória.");
      return false;
    }
    if (Idescricao.value.trim() === "") {
      alert("Descrição do produto é obrigatória.");
      return false;
    }
    if (Iavaliacao.value.trim() === "") {
      alert("Avaliação do produto é obrigatória.");
      return false;
    }
    if (!formData) {
      alert("Imagem do produto é obrigatória.");
      return false;
    }
    return true;
  }

  function registerProduct() {
    if (validateForm()) {
      fetch("http://localhost:8080/product", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          nome: Inome.value,
          valor: Ivalor.value,
          qtd: Iqtd.value,
          descricao: Idescricao.value,
          avaliacao: Iavaliacao.value,
          stats: stats,
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
        .then((res) => {
          alert("Produto cadastrado com sucesso!");
          sendFile(res);
          numImage = 0;
        })
        .catch((err) => {
          console.error("Erro ao cadastrar produto!", err);
        });
    }
  }

  function alterarProduto() {
    if (validateForm()) {
      fetch("http://localhost:8080/product", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          id: alterProd.id,
          nome: Inome.value,
          valor: Ivalor.value,
          qtd: Iqtd.value,
          descricao: Idescricao.value,
          avaliacao: Iavaliacao.value,
          stats: alterProd.stats,
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
        .then((res) => {
          alert("Produto alterado com sucesso!");
          localStorage.removeItem("alterProd");
          alterFile(res);
          numImage = 0;
          window.location.href = "../pages/productTable.html";
        })
        .catch((err) => {
          console.error("Erro ao alterar produto!", err);
        });
    }
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (alterProd) {
      alterarProduto();
    } else {
      registerProduct();
    }
  });
  function limpar() {
    Inome.value = "";
    Ivalor.value = "";
    Iqtd.value = "";
    Idescricao.value = "";
    Iavaliacao.value = "";
  }
  BtnCancel.addEventListener("click", () => {
    limpar();
    localStorage.removeItem("alterProd");
    window.location.href = "../pages/productTable.html";
  });

  input.addEventListener("change", () => {
    let lista = document.getElementById("listaCarrossel");
    let images = document.getElementById("imagesCarrosel");
    select.parentNode.style.display = "block";
    select.style.display = "block";
    for (let i = 0; i < input.files.length; i++) {
      formData.append("arquivos", input.files[i]); // 'arquivos' é o nome que o backend vai esperar

      // Indicadores
      const li = `<li data-target="#carouselExampleIndicators" data-slide-to="${numImage}" ${
        numImage === 0 ? 'class="active"' : ""
      }></li>`;
      lista.insertAdjacentHTML("beforeend", li);

      // Imagens
      const item = `
      <div class="carousel-item ${numImage === 0 ? "active" : ""}">
        <img class="d-block w-100" src="${URL.createObjectURL(
          input.files[i]
        )}" alt="Slide ${numImage + 1}" />
      </div>`;
      images.insertAdjacentHTML("beforeend", item);

      select.insertAdjacentHTML(
        "beforeend",
        `<option value="${numImage}">${input.files[i].name}</option>`
      );
      numImage++;
    }
  });

  async function addImagens() {
    let lista = document.getElementById("listaCarrossel");
    let images = document.getElementById("imagesCarrosel");
    if (
      loggedInUser.grupo === "Administrador" ||
      loggedInUser.grupo === "Adm"
    ) {
      select.parentNode.style.display = "block";
      select.style.display = "block";
    }
    for (let i = 0; i < alterProd.imagens.length; i++) {
      const resposta = await fetch(alterProd.imagens[i].linkimg);
      const blob = await resposta.blob();
      const nomeArquivo = caminho.split("/").pop();
      formData.append("arquivos", blob, nomeArquivo);

      // Indicadores
      const li = `<li data-target="#carouselExampleIndicators" data-slide-to="${numImage}" ${
        numImage === 0 ? 'class="active"' : ""
      }></li>`;
      lista.insertAdjacentHTML("beforeend", li);

      // Imagens
      const item = `
      <div class="carousel-item ${alterProd.imagens[i].padrao ? "active" : ""}">
        <img class="d-block w-100" src="../../../../../${
          alterProd.imagens[i].linkimg
        }" alt="Slide ${numImage + 1}" />
      </div>`;
      images.insertAdjacentHTML("afterbegin", item);

      select.insertAdjacentHTML(
        "beforeend",
        `<option value="${numImage}">${alterProd.imagens[i].nome}</option>`
      );
      numImage++;
    }
  }
  function sendFile(res) {
    formData.append("produto", JSON.stringify(res));
    formData.append("principal", select.value);
    fetch("http://localhost:8080/productImg", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Deu ruim na requisição");
        return response;
      })
      .then((data) => {
        input.value = ""; // Limpa o input pra próxima imagem
        window.location.href = "../pages/productTable.html";
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Deu erro ao enviar a imagem.");
      });
  }

  function alterFile(res) {
    formData.append("produto", JSON.stringify(res));
    formData.append("principal", select.value);
    fetch("http://localhost:8080/productImg", {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Deu ruim na requisição");
        return response;
      })
      .then((data) => {
        input.value = ""; // Limpa o input pra próxima imagem
        window.location.href = "../pages/productTable.html";
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Deu erro ao enviar a imagem.");
      });
  }
});

//incluir multipart para novas imagens no DTO de alteração
//verificar os erros restantes
