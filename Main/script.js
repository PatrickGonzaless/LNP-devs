const form = document.querySelector("form");
const Iusername = document.querySelector(".username");
const Ipassword = document.querySelector(".password");

function navigateTo(page) {
  window.location.href = page;
}

function login() {
  return fetch("http://localhost:8080/users", {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      let users = Array.isArray(JSON.stringify(res)) ? res : [];
      for (let i = 0; i < users.length; i++) {
        console.log(users.username);

        if (
          users[i].username === Iusername.value &&
          users[i].password === Ipassword.value
        ) {
          return users[i];
        }
      }
      alert("Usuario ou senha incorretos");
      return null;
    })
    .catch(function (res) {
      console.log(res);
      return null;
    });
}

function clean() {
  Iusername.value = "";
  Ipassword.value = "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let user = login();
  clean();
  if (user.username==Iusername) {
    console.log(user);
    // navigateTo("../LinkPage/index.html");
  }
});
