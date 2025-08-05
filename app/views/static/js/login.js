const forms = document.getElementById("login-caixa");
const mensagem = document.getElementById("mensagem");

forms.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, senha, estado }),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      window.location.href = "/pages/painelControle.html"; // redireciona para o novo painel
    } else {
      mensagem.textContent = dados.mensagem;
      mensagem.style.color = "red";
    }
  } catch (erro) {
    mensagem.textContent = "Erro de conexão com o servidor.";
    mensagem.style.color = "#990000";
  }
});
