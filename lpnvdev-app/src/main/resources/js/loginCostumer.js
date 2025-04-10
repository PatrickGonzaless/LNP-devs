document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    fetch("http://localhost:8080/costumer/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Falha no login");
        }
        return res.text(); 
      })
      .then((mensagem) => {
        alert("Login realizado com sucesso!");
        window.location.href = "home.html"; 
      })
      .catch((err) => {
        alert("Email ou senha inválidos.");
      });
  });