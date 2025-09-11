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
const grupos = document.querySelectorAll(".grupoTipo");
const form = document.getElementById("formCadastroProduto");

const editarIcon =
  "{{ url_for('static', filename='assets/icons/editar.svg') }}";
const lixeiraIcon =
  "{{ url_for('static', filename='assets/icons/lixeira.svg') }}";
const toastContainer = document.getElementById("toastContainer");

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
btnFecharModalEstoque.addEventListener("click", () => {
  modalCadastro.close();
  form.reset();
  tipoProduto.value = "";
  grupos.forEach((grupo) => (grupo.hidden = true));
});
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

tipoProduto.addEventListener("change", () => {
  grupos.forEach((grupo) => (grupo.hidden = true));
  const selecionado = tipoProduto.value;
  if (selecionado === "linha")
    document.getElementById("formLinha").hidden = false;
  if (selecionado === "tecido")
    document.getElementById("formTecido").hidden = false;
  if (selecionado === "extra")
    document.getElementById("formExtra").hidden = false;
});

//Cadastros de produtos

//Atualizar produtos
async function abrirModalEdicaoLinha(codigo_linha) {
  try {
    const resposta = await fetch(`/api/linha`);
    const linhas = await resposta.json();
    const linha = linhas.find((lin) => lin.codigo_linha == codigo_linha);

    if (!linha) return alert("Linha não encontrada!");

    modalCadastro.showModal();
    form.reset();

    tipoProduto.value = "linha";
    tipoProduto.disabled = true;

    grupos.forEach((grup) => (grup.hidden = true));
    document.getElementById("formLinha").hidden = false;
  } catch (error) {
    console.error("Erro ao carregar as linhas:", error);
  }
}

async function abrirModalEdicaoTecido(codigo_tecido) {
  try {
    const resposta = await fetch(`/api/tecido`);
    const tecidos = await resposta.json();
    const tecido = tecidos.find((tec) => tec.codigo_tecido == codigo_tecido);

    if (!tecido) return alert("Tecido não encontrada!");

    modalCadastro.showModal();
    form.reset();

    tipoProduto.value = "tecido";
    tipoProduto.disabled = true;

    grupos.forEach((grup) => (grup.hidden = true));
    document.getElementById("formTecido").hidden = false;
  } catch (error) {
    console.error("Erro ao carregar os tecidos:", error);
  }
}

async function abrirModalEdicaoExtra(codigo_extra) {
  try {
    const resposta = await fetch(`/api/produtos_extras`);
    const extras = await resposta.json();
    const extra = extras.find((ext) => ext.codigo_extra == codigo_extra);

    if (!extra) return alert("Extra não encontrada!");

    modalCadastro.showModal();
    form.reset();

    tipoProduto.value = "extra";
    tipoProduto.disabled = true;

    grupos.forEach((grup) => (grup.hidden = true));
    document.getElementById("formExtra").hidden = false;
  } catch (error) {
    console.error("Erro ao carregar os produtos extras:", error);
  }
}

//Deletar produtos
async function deletarLinha(codigo_linha) {
  if (!confirm("Deseja realmente deletar esta linha?")) return;
  try {
    const resposta = await fetch(`/api/linha/${codigo_linha}`, {
      method: "DELETE",
    });
    const resultado = await resposta.json();
    alert(resultado.mensagem || "Linha deletada!");
    location.reload();
  } catch (error) {
    console.error("Erro ao deletar linha:", error);
  }
}

async function deletarTecido(codigo_tecido) {
  if (!confirm("Deseja realmente deletar este tecido?")) return;
  try {
    const resposta = await fetch(`/api/tecido/${codigo_tecido}`, {
      method: "DELETE",
    });
    const resultado = await resposta.json();
    alert(resultado.mensagem || "Tecido deletado!");
    location.reload();
  } catch (error) {
    console.error("Erro ao deletar tecido:", error);
  }
}

async function deletarExtra(codigo_extra) {
  if (!confirm("Deseja realmente deletar esta linha?")) return;
  try {
    const resposta = await fetch(`/api/produtos_extras/${codigo_extra}`, {
      method: "DELETE",
    });
    const resultado = await resposta.json();
    alert(resultado.mensagem || "Produto extra deletado!");
    location.reload();
  } catch (error) {
    console.error("Erro ao deletar linha:", error);
  }
}

//Ligação com os botões de editar e excluir às funcões
document.addEventListener("click", (evento) => {
  if (evento.target.closest(".btnEditarLinha")) {
    const id = evento.target.closest("button").dataset.id;
    abrirModalEdicaoLinha(id);
  }
  if (evento.target.closest(".btnDeletarLinha")) {
    const id = evento.target.closest("button").dataset.id;
    deletarLinha(id);
  }
});

document.addEventListener("click", (evento) => {
  if (evento.target.closest(".btnEditarTecido")) {
    const id = evento.target.closest("button").dataset.id;
    abrirModalEdicaoTecido(id);
  }
  if (evento.target.closest(".btnDeletarTecido")) {
    const id = evento.target.closest("button").dataset.id;
    deletarTecido(id);
  }
});

document.addEventListener("click", (evento) => {
  if (evento.target.closest(".btnEditarExtra")) {
    const id = evento.target.closest("button").dataset.id;
    abrirModalEdicaoExtra(id);
  }
  if (evento.target.closest(".btnDeletarExtra")) {
    const id = evento.target.closest("button").dataset.id;
    deletarExtra(id);
  }
});

// Carregamento dos dados nas tabelas
document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.querySelector("#tabelaLinhas tbody");

  try {
    const resposta = await fetch("/api/linha");
    const linhas = await resposta.json();
    tabela.innerHTML = "";

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
          <button class="botoesDecisao btnEditarLinha" data-id="${
            linha.codigo_linha
          }" title="Editar">
            <img src=${editarIcon} alt="Editar" />
          </button>
          <button class="botoesDecisao btnDeletarLinha" data-id="${
            linha.codigo_linha
          }" title="Excluir">
            <img src=${lixeiraIcon} alt="Excluir" />
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
          <button class="botoesDecisao btnEditarTecido" data-id="${
            tecido.codigo_tecido
          }" title="Editar">
            <img src=${editarIcon} alt="Editar" />
          </button>
          <button class="botoesDecisao btnDeletarTecido" data-id="${
            tecido.codigo_tecido
          }" title="Excluir">
            <img src=${lixeiraIcon} alt="Excluir" />
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
          <button class="botoesDecisao btnEditarExtra" data-id="${
            extra.codigo_extra
          }" title="Editar">
            <img src=${editarIcon} alt="Editar" />
          </button>
          <button class="botoesDecisao btnDeletarExtra" data-id="${
            extra.codigo_extra
          }" title="Excluir">
            <img src=${lixeiraIcon} alt="Excluir" />
          </button>
        </td>`;
      tabela.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao buscar tecidos:", error);
  }
});

function mostrarToast(mensagem, tipo = "sucesso", duracao = 4000) {
  const toast = document.createElement("div");
  toast.classList.add("toast", tipo);

  //Ícone
  const icon = document.createElement("span");
  icon.classList.add("icon");
  icon.textContent = tipo === "sucesso" ? "✅" : "⚠️";

  // Texto da mensagem
  const text = document.createElement("span");
  text.textContent = mensagem;

  // Botão de fechar
  const btnFechar = document.createElement("button");
  btnFechar.classList.add("fechar-btn");
  btnFechar.innerHTML = "&times;";

  btnFechar.addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => toastContainer.removeChild(toast), 400);
  });

  toast.appendChild(icon);
  toast.appendChild(text);
  toast.appendChild(btnFechar);
  toastContainer.appendChild(toast);

  // Mostrar com animação
  setTimeout(() => toast.classList.add("show"), 100);

  // Remover automaticamente após a duração
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 400);
  }, duracao);
}
