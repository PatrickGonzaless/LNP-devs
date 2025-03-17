const form = document.querySelector("form");
const Iusername = document.querySelector(".username");
const Icpf = document.querySelector(".cpf");
const Iemail = document.querySelector(".email");
const Sgrupo = document.querySelector(".grupo");
const Isenha = document.querySelector(".senha");
const Iconfpassword = document.querySelector(".confpassword");
let stats = true;
const userToAlter = JSON.parse(localStorage.getItem("userToAlter"));
const loggedEmail = JSON.parse(localStorage.getItem("loggedInUser")).email;

if (userToAlter !== null) {
  Iusername.value = userToAlter.username;
  Icpf.value = userToAlter.cpf;
  Iemail.value = userToAlter.email;
  Sgrupo.selectedIndex = userToAlter.grupo == "Administrador" ? 1 : 2;
  Isenha.value = "";
  Isenha.placeholder = "Nova senha(apenas caso queira)";
  Iconfpassword.value = "";
  Iconfpassword.placeholder = "Confirme a nova senha";
  stats = userToAlter.stats;
  localStorage.removeItem("userToAlter");

  Iemail.disabled = true;
  if (loggedEmail === userToAlter.email) {
    Sgrupo.value = "Administrador";
    Sgrupo.disabled = true;
  }
}

function validateForm() {
  // Validação do nome de usuário
  if (Iusername.value.trim() === "") {
    alert("Nome de usuário é obrigatório.");
    return false;
  }

  // Validação do CPF
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

  // Validação do e-mail
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(Iemail.value)) {
    alert("E-mail inválido. Verifique o formato.");
    return false;
  }

  // Validação de confirmação de senha
  if (Isenha.value !== Iconfpassword.value) {
    alert("As senhas não coincidem.");
    return false;
  }

  // Se todas as validações passaram, retorna true
  return true;
}

function register() {
  if (Isenha == "") {
    fetch("http://localhost:8080/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        id: userToAlter.id,
        username: Iusername.value,
        cpf: Icpf.value,
        email: Iemail.value,
        grupo: Sgrupo.value,
        senha: userToAlter.senha,
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
      .then((data) => {
        alert("Usuário alterado com sucesso!", data);
      })
      .catch((err) => {
        console.error("Erro ao alterar usuário!", err);
      });
  } else if (userToAlter !== null) {
    fetch("http://localhost:8080/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: userToAlter.id,
        username: Iusername.value,
        cpf: Icpf.value,
        email: Iemail.value,
        grupo: Sgrupo.value,
        senha: Isenha.value,
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
      .then((data) => {
        alert("Usuário alterado com sucesso!", data);
      })
      .catch((err) => {
        console.error("Erro ao alterar usuário!", err);
      });
  } else {
    fetch("http://localhost:8080/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: Iusername.value,
        cpf: Icpf.value,
        email: Iemail.value,
        grupo: Sgrupo.value,
        senha: Isenha.value,
        stats: true,
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
  Iusername.value = "";
  Icpf.value = "";
  Iemail.value = "";
  Sgrupo.value = "";
  Isenha.value = "";
  Iconfpassword.value = "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    register();
    clean();
  }
});
