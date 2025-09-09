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
const formExtra = document.getElementById("formExtra");

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

//resetar selects no modal
function resetarSelectsModalCadastro() {
  const selects = modalCadastro.querySelectorAll("select");
  selects.forEach((select) => {
    select.value = "";
  });
}

modalCadastro.addEventListener("close", resetarSelectsModalCadastro);

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
  formExtra.hidden = true;

  switch (tipoProduto.value) {
    case "linha":
      formLinha.hidden = false;
      break;
    case "tecido":
      formTecido.hidden = false;
      break;
    case "extra":
      formExtra.hidden = false;
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

// Carregamento dos dados nas tabelas
document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.querySelector("#tabelaLinhas tbody");

  try {
    const resposta = await fetch("/api/linha");
    const linhas = await resposta.json();
    tabela.innerHTML = "";
    console.log(linhas);
    linhas.forEach((linha) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="linhaColuna">${linha.codigo_linha}</td>
        <td class="linhaColuna">${linha.nome}</td>
        <td class="linhaColuna">${linha.marca}</td>
        <td class="linhaColuna">${linha.cor}</td>
        <td class="linhaColuna">${linha.codigo_cor}</td>
        <td class="linhaColuna">${linha.tipo}</td>
        <td class="linhaColuna">${linha.material}</td>
        <td class="linhaColuna">${linha.comprimento_metros}</td>
        <td class="linhaColuna">${linha.espessura}</td>
        <td class="linhaColuna">R$ ${parseFloat(linha.preco_base).toFixed(
          2
        )}</td>
        <td class="linhaColuna">${new Date(
          linha.data_cadastro
        ).toLocaleDateString("pt-BR")}</td>
        <td class="linhaColuna"">
          <span class="itemEstado emEstoque"></span>
        </td>
        <td class="linhaColuna acoes">
          <button class="botoesDecisao" title="Editar">
            <img src="editar.svg" alt="editar.svg"/>
          </button>
          <button class="botoesDecisao" title="Excluir">
            <img src="lixeira.svg" alt="lixeira.svg" />
          </button>
        </td>`;
      tabela.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao buscar tecidos:", error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.querySelector("#tabelaTecidos tbody");

  try {
    const resposta = await fetch("/api/tecido");
    const tecidos = await resposta.json();
    tabela.innerHTML = "";
    console.log(tecidos);
    tecidos.forEach((tecido) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="linhaColuna">${tecido.codigo_tecido}</td>
        <td class="linhaColuna">${tecido.nome}</td>
        <td class="linhaColuna">${tecido.marca}</td>
        <td class="linhaColuna">${tecido.tipo_tecido}</td>
        <td class="linhaColuna">${tecido.estampa}</td>
        <td class="linhaColuna">${tecido.cor}</td>
        <td class="linhaColuna">${tecido.largura_cm}</td>
        <td class="linhaColuna">R$ ${parseFloat(tecido.preco_metro).toFixed(
          2
        )}</td>
        <td class="linhaColuna">${tecido.composicao}</td>
        <td class="linhaColuna">${tecido.peso_g_m2}</td>
        <td class="linhaColuna">${new Date(
          tecido.data_cadastro
        ).toLocaleDateString("pt-BR")}</td>
        <td class="linhaColuna">
          <span class="itemEstado emEstoque"></span>
        </td>
        <td class="linhaColuna acoes">
          <button class="botoesDecisao" title="Editar">
            <img src="editar.svg" alt="editar.svg"/>
          </button>
          <button class="botoesDecisao" title="Excluir">
            <img src="lixeira.svg" alt="lixeira.svg" />
          </button>
        </td>`;
      tabela.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao buscar tecidos:", error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.querySelector("#tabelaProdutosExtras tbody");

  try {
    const resposta = await fetch("/api/produtos_extras");
    const extras = await resposta.json();
    tabela.innerHTML = "";
    console.log(extras);
    extras.forEach((extra) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="linhaColuna">${extra.codigo_extra}</td>
        <td class="linhaColuna">${extra.nome}</td>
        <td class="linhaColuna">${extra.categoria}</td>
        <td class="linhaColuna">${extra.marca}</td>
        <td class="linhaColuna">${extra.cor}</td>
        <td class="linhaColuna">${extra.tamanho}</td>
        <td class="linhaColuna">${extra.material}</td>
        <td class="linhaColuna">R$ ${parseFloat(extra.preco_base).toFixed(
          2
        )}</td>
        <td class="linhaColuna">${extra.unidade_medida}</td>
        <td class="linhaColuna">${new Date(
          extra.data_cadastro
        ).toLocaleDateString("pt-BR")}</td>
        <td class="linhaColuna">
          <span class="itemEstado emEstoque"></span>
        </td>
        <td class="linhaColuna acoes">
          <button class="botoesDecisao" title="Editar">
            <img src="editar.svg" alt="editar.svg"/>
          </button>
          <button class="botoesDecisao" title="Excluir">
            <img src="lixeira.svg" alt="lixeira.svg" />
          </button>
        </td>`;
      tabela.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao buscar tecidos:", error);
  }
});
