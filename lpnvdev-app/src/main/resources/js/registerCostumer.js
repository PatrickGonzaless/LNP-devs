const Iform = document.getElementById("registerForm");
const Ifullname = document.getElementById("name");
const Icpf = document.getElementById("cpf");
const Iemail = document.getElementById("email");
const Idob = document.getElementById("dob");
const Isenha = document.getElementById("password");
const Iconfpassword = document.getElementById("confirmPassword");
const IlogradouroT = document.getElementById("logradouroT");
const IlogradouroD = document.getElementById("logradouroD");
const IcepT = document.getElementById("cepT");
const IcepD = document.getElementById("cepD");
const IbairroT = document.getElementById("bairroT");
const IbairroD = document.getElementById("bairroD");
const IUfT = document.getElementById("ufT");
const IUfD = document.getElementById("ufD");
const IcidadeT = document.getElementById("cidadeT");
const IcidadeD = document.getElementById("cidadeD");
const InumeroT = document.getElementById("numeroT");
const InumeroD = document.getElementById("numeroD");
const IcomplementoT = document.getElementById("complementoT");
const IcomplementoD = document.getElementById("complementoD");

const userToAlter = JSON.parse(localStorage.getItem("userToAlter"));
const AdressToAlter = JSON.parse(localStorage.getItem("AdressToAlter"));
let loggedEmail = null;
const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

function validateForm() {
  if (Ifullname.value.trim() === "") {
    alert("Nome de usuário é obrigatório.");
    return false;
  }

  const nomeValido = Ifullname.value
    .trim()
    .split(" ")
    .filter((palavra) => palavra.length >= 3);

  if (nomeValido.length < 2) {
    alert(
      "O nome completo deve conter pelo menos duas palavras com no mínimo 3 letras cada."
    );
    return false;
  }

  function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  }

  if (!validateCPF(Icpf.value)) {
    alert("CPF inválido.");
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(Iemail.value)) {
    alert("E-mail inválido. Verifique o formato.");
    return false;
  }

  if (Isenha.value !== Iconfpassword.value) {
    alert("As senhas não coincidem.");
    return false;
  }

  return true;
}

function registerUser() {
  fetch("http://localhost:8080/costumer", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: Iemail.value,
      cpf: Icpf.value,
      nomecompleto: Ifullname.value,
      datanascimento: Idob.value,
      genero: document.getElementById("genero").value == "M" ? true : false,
      senha: Isenha.value,
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
    .then((data) => {
      alert("Usuário Cadastrado com sucesso!");
      registerAdress(data);
      clean();
    })
    .catch((err) => {
      alert("Usuário já cadastrado!");
    });
}

function registerAdress(costumer) {
  fetch("http://localhost:8080/adress", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      costumerId: costumer.id,
      logradouro: IlogradouroT.value,
      cep: IcepT.value,
      bairro: IbairroT.value,
      uf: IUfT.value,
      cidade: IcidadeT.value,
      numero: InumeroT.value,
      complemento: IcomplementoT.value,
      tipoendereco: true,
      principal: false,
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
    .then((dataAdress) => {
      fetch("http://localhost:8080/adress", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          costumerId: costumer.id,
          logradouro: IlogradouroD.value,
          cep: IcepD.value,
          bairro: IbairroD.value,
          uf: IUfD.value,
          cidade: IcidadeD.value,
          numero: InumeroD.value,
          complemento: IcomplementoD.value,
          tipoendereco: false,
          principal: true,
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
        .then((dataAdress) => {
          console.log("Endereço principal salvo com sucesso!");

          // NOVA PARTE: Enviar os endereços de entrega adicionais
          const deliverySections = document.querySelectorAll(".deliveryAddressSection");
          deliverySections.forEach((section, index) => {
            if (index === 0) return; // Ignora o primeiro

            const logradouro = section.querySelector(`[name^="logradouroD"]`).value;
            const cep = section.querySelector(`[name^="cepD"]`).value;
            const bairro = section.querySelector(`[name^="bairroD"]`).value;
            const uf = section.querySelector(`[name^="ufD"]`).value;
            const cidade = section.querySelector(`[name^="cidadeD"]`).value;
            const numero = section.querySelector(`[name^="numeroD"]`).value;
            const complemento = section.querySelector(`[name^="complementoD"]`).value;

            fetch("http://localhost:8080/adress", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                costumerId: costumer.id,
                logradouro,
                cep,
                bairro,
                uf,
                cidade,
                numero,
                complemento,
                tipoendereco: false,
                principal: false,
              }),
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
                }
                return res.json();
              })
              .then((extraAddressData) => {
                console.log("Endereço adicional salvo:", extraAddressData);
              })
              .catch((err) => {
                console.error("Erro ao salvar endereço adicional:", err);
              });
          });

          alert("Endereços salvos com sucesso!");
          window.location.href = "../pages/loginCostumer.html";
        })
        .catch((err) => {
          console.error("Erro ao alterar endereço!", err);
        });
    })
    .catch((err) => {
      console.error("Erro ao alterar endereço!", err);
    });
}

function clean() {
  Ifullname.value = "";
  Icpf.value = "";
  Idob.value = "";
  IlogradouroT.value = "";
  IlogradouroD.value = "";
  IcepT.value = "";
  IcepD.value = "";
  IbairroT.value = "";
  IbairroD.value = "";
  IUfT.value = "";
  IUfD.value = "";
  IcidadeT.value = "";
  IcidadeD.value = "";
  InumeroT.value = "";
  InumeroD.value = "";
  IcomplementoT.value = "";
  IcomplementoD.value = "";
  IcepT.value = "";
  IcepD.value = "";
  Iemail.value = "";
  Isenha.value = "";
  Iconfpassword.value = "";
}

Iform.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    registerUser();
  }
});

document.querySelector("#copyBtn").addEventListener("click", function (event) {
  event.preventDefault();

  const camposFiscais = [
    IlogradouroT.value,
    IcepT.value,
    IbairroT.value,
    IUfT.value,
    IcidadeT.value,
    InumeroT.value,
    IcomplementoT.value,
  ];

  const todosPreenchidos = camposFiscais.every((campo) => campo.trim() !== "");

  if (!todosPreenchidos) {
    alert(
      "Por favor, preencha todos os campos do Endereço Fiscal antes de copiar."
    );
    return;
  }

  IlogradouroD.value = IlogradouroT.value;
  IcepD.value = IcepT.value;
  IbairroD.value = IbairroT.value;
  IUfD.value = IUfT.value;
  IcidadeD.value = IcidadeT.value;
  InumeroD.value = InumeroT.value;
  IcomplementoD.value = IcomplementoT.value;

  console.log("Endereço Fiscal copiado para Endereço de Entrega!");
});

IcepT.addEventListener("blur", function () {
  let cep = IcepT.value.replace(/\D/g, "");
  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.erro) {
          IlogradouroT.value = data.logradouro;
          IbairroT.value = data.bairro;
          IUfT.value = data.uf;
          IcidadeT.value = data.localidade;
        } else {
          alert("CEP não encontrado.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar o CEP:", error);
      });
  } else {
    alert("Formato de CEP inválido.");
  }
});

IcepD.addEventListener("blur", function () {
  let cep = IcepD.value.replace(/\D/g, "");
  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.erro) {
          IlogradouroD.value = data.logradouro;
          IbairroD.value = data.bairro;
          IUfD.value = data.uf;
          IcidadeD.value = data.localidade;
        } else {
          alert("CEP não encontrado.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar o CEP:", error);
      });
  } else {
    alert("Formato de CEP inválido.");
  }
});

let deliveryAddressCount = 1;

document.getElementById("addNewAdress").addEventListener("click", function () {
  deliveryAddressCount++;

  const newAddressSection = document.createElement("div");
  newAddressSection.classList.add("deliveryAddressSection");

  const title = document.createElement("h3");
  title.innerText = `Endereço de Entrega ${deliveryAddressCount}`;
  newAddressSection.appendChild(title);

  newAddressSection.innerHTML += `
    <div class="input-group">
      <input type="text" name="logradouroD${deliveryAddressCount}" placeholder="Logradouro" required />
      <input type="text" name="cepD${deliveryAddressCount}" placeholder="CEP" required class="cepInput" />
    </div>
    <div class="input-group">
      <input type="text" name="bairroD${deliveryAddressCount}" placeholder="Bairro" required />
      <input type="text" name="ufD${deliveryAddressCount}" placeholder="UF" required />
    </div>
    <div class="input-group">
      <input type="text" name="cidadeD${deliveryAddressCount}" placeholder="Cidade" required />
      <input type="text" name="numeroD${deliveryAddressCount}" placeholder="Número" required />
    </div>
    <div class="input-group">
      <input type="text" name="complementoD${deliveryAddressCount}" placeholder="Complemento" required />
    </div>
  `;

  document.getElementById("delAdressContent").appendChild(newAddressSection);

  const cepInput = newAddressSection.querySelector(".cepInput");
  cepInput.addEventListener("blur", function () {
    const cep = cepInput.value.replace(/\D/g, "");
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            newAddressSection.querySelector(`[name="logradouroD${deliveryAddressCount}"]`).value = data.logradouro;
            newAddressSection.querySelector(`[name="bairroD${deliveryAddressCount}"]`).value = data.bairro;
            newAddressSection.querySelector(`[name="ufD${deliveryAddressCount}"]`).value = data.uf;
            newAddressSection.querySelector(`[name="cidadeD${deliveryAddressCount}"]`).value = data.localidade;
          } else {
            alert("CEP não encontrado.");
          }
        })
        .catch(error => {
          console.error("Erro ao buscar o CEP:", error);
        });
    } else {
      alert("Formato de CEP inválido.");
    }
  });
});
