const form = document.querySelector("form");
const Iusername = document.querySelector(".username");
const Icpf = document.querySelector(".cpf");
const Iemail = document.querySelector(".email");
const Sgrupo = document.querySelector(".grupo");
const Isenha = document.querySelector(".senha");
const Iconfpassword = document.querySelector(".confpassword");
let stats = true;

function register() {
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
    })
    .catch((err) => {
      console.error("Erro ao cadastrar usuário!", err);
    });
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

  register();
  console.log(Iusername.value);
  console.log(Icpf.value);
  console.log(Iemail.value);
  console.log(Sgrupo.value);
  console.log(Isenha.value);

  clean();
});
