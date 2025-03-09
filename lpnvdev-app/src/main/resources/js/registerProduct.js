document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const prodname = document.querySelector(".prodname");
    const preco = document.querySelector(".preco");
    const qntd = document.querySelector(".qntd");
    const descricao = document.querySelector(".descricao");
    const avaliacao = document.querySelector(".avaliacao");
    const imagemInput = document.querySelector("#imagem");
    
    // Função de validação do formulário
    function validateForm() {
      if (prodname.value.trim() === "") {
        alert("Nome do produto é obrigatório.");
        return false;
      }
      if (preco.value.trim() === "") {
        alert("Preço do produto é obrigatório.");
        return false;
      }
      if (qntd.value.trim() === "") {
        alert("Quantidade do produto é obrigatória.");
        return false;
      }
      if (descricao.value.trim() === "") {
        alert("Descrição do produto é obrigatória.");
        return false;
      }
      if (avaliacao.value.trim() === "") {
        alert("Avaliação do produto é obrigatória.");
        return false;
      }
      return true;
    }
  
    // Função para enviar dados para o backend
    function registerProduct() {
      if (validateForm()) {
        const formData = new FormData();
        formData.append("prodname", prodname.value);
        formData.append("preco", preco.value);
        formData.append("qntd", qntd.value);
        formData.append("descricao", descricao.value);
        formData.append("avaliacao", avaliacao.value);
  
        // Verifica se uma imagem foi selecionada
        if (imagemInput.files.length > 0) {
          formData.append("imagem", imagemInput.files[0]);
        }
  
        // Envia os dados para o backend
        fetch("http://localhost:8080/product", {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
            }
            return res.json();
          })
          .then((data) => {
            alert("Produto cadastrado com sucesso!", data);
            // Limpa os campos do formulário após o sucesso
            form.reset();
          })
          .catch((err) => {
            console.error("Erro ao cadastrar produto!", err);
          });
      }
    }
  
    // Evento para enviar o formulário
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      registerProduct();
    });
  });
  