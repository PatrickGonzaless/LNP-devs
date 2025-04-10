const formC = document.querySelector("#registerForm");
const formTA = document.querySelector("#taxAdressForm");
const formDA = document.querySelector("#delAdressForm");
const Ifullname = document.querySelector("#name");
const Icpf = document.querySelector("#cpf");
const Iemail = document.querySelector("#email");
const Idob = document.querySelector("#dob");
const genero = true;
const Isenha = document.querySelector("#password");
const Iconfpassword = document.querySelector("#confpassword");
const userToAlter = JSON.parse(localStorage.getItem("userToAlter"));
const loggedEmail = JSON.parse(localStorage.getItem("loggedInUser")).email;

function validateForm() {
  if (Iusername.value.trim() === "") {
    alert("Nome de usuário é obrigatório.");
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

  // Se todas as validações passaram, retorna true
  return true;
}

function register() {
  if (Isenha == "") {
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

function clean() {
  Ifullname.value = "";
  Icpf.value = "";
  Iemail.value = "";
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
