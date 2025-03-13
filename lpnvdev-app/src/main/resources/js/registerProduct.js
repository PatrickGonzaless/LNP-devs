document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const Inome = document.querySelector(".prodname");
  const Ivalor = document.querySelector(".preco");
  const Iqtd = document.querySelector(".qntd");
  const Idescricao = document.querySelector(".descricao");
  const Iavaliacao = document.querySelector(".avaliacao");
  let stats = true;

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
    console.log(Ilinkimage);
    if (!Ilinkimage) {
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
        })
        .catch((err) => {
          console.error("Erro ao cadastrar produto!", err);
        });
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    registerProduct();
  });
});

// function showFileName() {
//   Ilinkimage = document.getElementById("imagem").files;
//   formData.append("file", Ilinkimage);
//   //let file = Ilinkimage[0].name;
// }
