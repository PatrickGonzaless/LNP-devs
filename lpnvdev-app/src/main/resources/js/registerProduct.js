

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const Inome = document.querySelector(".prodname");
  const Ivalor = document.querySelector(".preco");
  const Iqtd = document.querySelector(".qntd");
  const Idescricao = document.querySelector(".descricao");
  const Iavaliacao = document.querySelector(".avaliacao");
  let stats = true;
  const Ilinkimage = document.getElementById("imagem").files;

  function validateForm() {
    console.log(Ilinkimage.files);
    file = Ilinkimage.files[0];

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
    if (!file) {
      alert("Imagem do produto é obrigatória.")
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
            throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          alert("Produto cadastrado com sucesso!", data);

          const idteste = data.id.value;
          console.log(idteste);

          const formData = new FormData();
          formData.append("nome", Inome.value);

          for (let i = 0; i < Ilinkimage.length; i++) {
            formData.append("images", Ilinkimage[i].value);
          }

          fetch("http://localhost:8080/productImg", {
            method: "POST",
            body: formData
          })
            .then(response => response.json())
            .then(data => alert(data))
            .catch(error => console.error("Erro ao enviar produto:", error));

        })
        .catch((err) => {
          console.error("Erro ao cadastrar produto!", err);
        });
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    registerProduct();
  })
});

function showFileName() {
  var fileInput = document.getElementById("imagem");
  var fileName = fileInput.files[0].name; 
  console.log(fileName);
}
