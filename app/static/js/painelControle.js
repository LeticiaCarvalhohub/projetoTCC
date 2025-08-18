// Variáveis dos botões da página principal
const botaoMenu = document.getElementById("acessoNav");
const corpo = document.body;
const botoesNav = document.querySelectorAll(".navLink");
const sessoes = document.querySelectorAll("main section");
const chaveEstado = "abaAtiva";

// Variáveis para abrir e fechar os modais
const modalCadastro = document.getElementById("modalCadastroProduto");
const modalCompras = document.getElementById("modalRegistroCompra");
const modalVenda = document.getElementById("modalRegistroVenda");
const btnAbrirModalCompra = document.getElementById("btnAbrirModalCompra");
const btnAbrirModalVenda = document.getElementById("btnAbrirModalVenda");
const btnAbrirModalEstoque = document.getElementById("btnAbrirModalEstoque");

const btnFecharModalCompra = document.getElementById("botaoFecharCompra");
const btnFecharModalVenda = document.getElementById("botaoFecharVenda");
const btnFecharModalEstoque = document.getElementById("botaoFecharModal");

const btnCancelarModalCompra = document.getElementById("botaoCancelarCompra");
const btnCancelarModalVenda = document.getElementById("botaoCancelarVenda");
const btnCancelarModalEstoque = document.getElementById("botaoCancelarModal");

const btnLogout = document.getElementById("btnLogout");

// Variáveis de alteração do conteúdo do formulário
const tipoProduto = document.getElementById("tipoProduto");
const formLinha = document.getElementById("formLinha");
const formTecido = document.getElementById("formTecido");
const formAdicional = document.getElementById("formAdicional");

// Botões para a navegação das abas principais
botaoMenu.addEventListener("click", () => {
  corpo.classList.toggle("navFechada");
});

function marcarBotaoAtivo(destino) {
  botoesNav.forEach((link) => {
    const ativo = link.dataset.destino === destino;
    link.classList.toggle("ativo", ativo);
  });
}

function mostrarSessaoAtiva(destino) {
  sessoes.forEach((sessao) => {
    sessao.style.display = sessao.id === destino ? "block" : "none";
  });
}

function salvarEstado(destino) {
  localStorage.setItem(chaveEstado, destino);
}

function ativarPagina(destino) {
  marcarBotaoAtivo(destino);
  mostrarSessaoAtiva(destino);
  salvarEstado(destino);
}

botoesNav.forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
    const destino = link.dataset.destino;
    ativarPagina(destino);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const destinoSalvo = localStorage.getItem(chaveEstado) || "dashboard";
  ativarPagina(destinoSalvo);
});

// Ações que ocorre dentro do modais
btnAbrirModalVenda.addEventListener("click", () => modalVenda.showModal());
btnFecharModalVenda.addEventListener("click", () => modalVenda.close());
btnCancelarModalVenda.addEventListener("click", () => modalVenda.close());

modalVenda.addEventListener("click", (evento) => {
  const reacao = modalVenda.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  ) {
    modalVenda.close();
  }
});

btnAbrirModalEstoque.addEventListener("click", () => modalCadastro.showModal());
btnFecharModalEstoque.addEventListener("click", () => modalCadastro.close());
btnCancelarModalEstoque.addEventListener("click", () => modalCadastro.close());

modalCadastro.addEventListener("click", (evento) => {
  const reacao = modalCadastro.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  ) {
    modalCadastro.close();
  }
});

// Contúdos do formulário do cadastro de produtos
tipoProduto.addEventListener("change", () => {
  formLinha.hidden = true;
  formTecido.hidden = true;
  formAdicional.hidden = true;

  switch (tipoProduto.value) {
    case "linha":
      formLinha.hidden = false;
      break;
    case "tecido":
      formTecido.hidden = false;
      break;
    case "adicional":
      formAdicional.hidden = false;
      break;
  }
});

btnLogout.addEventListener("click", async () => {
  try {
    const resposta = await fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      if (dados) {
        window.location.href = "/login";
      } else {
        alert("Erro ao sair");
      }
    } else {
      alert("Erro na requisição");
    }
  } catch (erro) {
    alert("Erro ao sair");
    console.error(erro);
  }
});
