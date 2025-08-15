const formLogin = document.getElementById("login-caixa");
const mensagem = document.getElementById("mensagem");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const estado = document.getElementById("estado").value;

  try {
    const resposta = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ usuario, senha, estado }),
    });

    if (!resposta.ok) {
      throw new Error('Erro HTTP: ${resposta.status}')
    }

    const dados = await resposta.json();

    if (dados.sucesso) {
      window.location.href = "/painelPrincipal";
    } else {
      mensagem.textContent = dados.mensagem || "Credenciais inválidas.";
      mensagem.style.color = "red";
    }
  } catch (erro) {
    console.error("Erro no login: ", erro)
    mensagem.textContent = "Credenciais inválidas.";
    mensagem.style.color = "#990000";
  }
}); 
