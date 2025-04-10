const Iform = document.querySelector("#registerForm");
const Ifullname = document.querySelector("#name");
const Icpf = document.querySelector("#cpf");
const Iemail = document.querySelector("#email");
const Idob = document.querySelector("#dob");
const genero = true;
const Isenha = document.querySelector("#password");
const Iconfpassword = document.querySelector("#confirmPassword");
const IlogradouroT = document.querySelector("#logradouroT");
const IlogradouroD = document.querySelector("#logradouroD");
const IcepT = document.querySelector("#cepT");
const IcepD = document.querySelector("#cepD");
const IbairroT = document.querySelector("#bairroT");
const IbairroD = document.querySelector("#bairroD");
const IUfT = document.querySelector("#ufT");
const IUfD = document.querySelector("#ufD");
const IcidadeT = document.querySelector("#cidadeT");
const IcidadeD = document.querySelector("#cidadeD");
const InumeroT = document.querySelector("#numeroT");
const InumeroD = document.querySelector("#numeroD");
const IcomplementoT = document.querySelector("#complementoT");
const IcomplementoD = document.querySelector("#complementoD");

const userToAlter = JSON.parse(localStorage.getItem("userToAlter"));
const AdressToAlter = JSON.parse(localStorage.getItem("AdressToAlter"));
let loggedEmail = null;
const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedUser) {
  const parsedUser = JSON.parse(loggedUser);
  if (parsedUser && parsedUser.email) {
    loggedEmail = parsedUser.email;
  }
}

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
  if (userToAlter !== null) {
    fetch("http://localhost:8080/costumer", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        id: userToAlter.id,
        name: Ifullname.value,
        dob: Idob.value,
        cpf: Icpf.value,
        email: Iemail.value,
        senha: userToAlter.senha,
        genero: genero,
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
        alert("Usuário alterado com sucesso!", data);
      })
      .catch((err) => {
        console.error("Erro ao alterar usuário!", err);
      });
  } else if (userToAlter !== null) {
    fetch("http://localhost:8080/costumer", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: userToAlter.id,
        name: Ifullname.value,
        dob: Idob.value,
        cpf: Icpf.value,
        email: Iemail.value,
        senha: Isenha.value,
        genero: genero,
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
        alert("Usuário alterado com sucesso!", data);
      })
      .catch((err) => {
        console.error("Erro ao alterar usuário!", err);
      });
  } else {
    fetch("http://localhost:8080/costumer", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: Ifullname.value,
        dob: Idob.value,
        cpf: Icpf.value,
        email: Iemail.value,
        senha: Isenha.value,
        genero: genero,
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
        alert("Usuário cadastrado com sucesso!", data);
        window.location.href = "../pages/index.html";
      })
      .catch((err) => {
        console.error("Erro ao cadastrar usuário!", err);
      });
  }
}

function registerAdress() {
  if (Isenha.value == "") {
    fetch("http://localhost:8080/adress", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        id: AdressToAlter ? AdressToAlter.id : undefined,
        logradouroT: IlogradouroT.value,
        logradouroD: IlogradouroD.value,
        cepT: IcepT.value,
        cepD: IcepD.value,
        bairroT: IbairroT.value,
        bairroD: IbairroD.value,
        ufT: IUfT.value,
        ufD: IUfD.value,
        cidadeT: IcidadeT.value,
        cidadeD: IcidadeD.value,
        numeroT: InumeroT.value,
        numeroD: InumeroD.value,
        complementoT: IcomplementoT.value,
        complementoD: IcomplementoD.value,
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
        alert("Endereço alterado com sucesso!", dataAdress);
      })
      .catch((err) => {
        console.error("Erro ao alterar endereço!", err);
      });
  } else if (AdressToAlter !== null) {
    fetch("http://localhost:8080/adress", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: AdressToAlter.id,
        logradouroT: IlogradouroT.value,
        logradouroD: IlogradouroD.value,
        cepT: IcepT.value,
        cepD: IcepD.value,
        bairroT: IbairroT.value,
        bairroD: IbairroD.value,
        ufT: IUfT.value,
        ufD: IUfD.value,
        cidadeT: IcidadeT.value,
        cidadeD: IcidadeD.value,
        numeroT: InumeroT.value,
        numeroD: InumeroD.value,
        complementoT: IcomplementoT.value,
        complementoD: IcomplementoD.value,
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
        alert("Endereço alterado com sucesso!", data);
      })
      .catch((err) => {
        console.error("Erro ao alterar endereço!", err);
      });
  } else {
    fetch("http://localhost:8080/adress", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: AdressToAlter.id,
        logradouroT: IlogradouroT.value,
        logradouroD: IlogradouroD.value,
        cepT: IcepT.value,
        cepD: IcepD.value,
        bairroT: IbairroT.value,
        bairroD: IbairroD.value,
        ufT: IUfT.value,
        ufD: IUfD.value,
        cidadeT: IcidadeT.value,
        cidadeD: IcidadeD.value,
        numeroT: InumeroT.value,
        numeroD: InumeroD.value,
        complementoT: IcomplementoT.value,
        complementoD: IcomplementoD.value,
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
        alert("Usuário cadastrado com sucesso!", data);
        window.location.href = "../pages/index.html";
      })
      .catch((err) => {
        console.error("Erro ao cadastrar usuário!", err);
      });
  }
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
    registerAdress();
    clean();
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
