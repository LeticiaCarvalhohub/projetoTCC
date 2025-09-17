// Variáveis dos botões da página principal
const botaoMenu = document.getElementById("acessoNav");
const corpo = document.body;
const botoesNav = document.querySelectorAll(".navLink");
const sessoes = document.querySelectorAll("main section");
const chaveEstado = "abaAtiva";

// Variáveis para abrir e fechar os modais
const modalCadastro = document.getElementById("modalCadastroProduto");
const btnAbrirModalEstoque = document.getElementById("btnAbrirModalEstoque");
const btnFecharModalEstoque = document.getElementById("botaoFecharModal");
const btnCancelarModalEstoque = document.getElementById("botaoCancelarModal");

const modalCompras = document.getElementById("modalRegistroCompra");
const btnAbrirModalCompra = document.getElementById("btnAbrirModalCompra");
const btnFecharModalCompra = document.getElementById("botaoFecharCompra");
const btnCancelarModalCompra = document.getElementById("botaoCancelarCompra");

const modalVenda = document.getElementById("modalRegistroVenda");
const btnAbrirModalVenda = document.getElementById("btnAbrirModalVenda");
const btnFecharModalVenda = document.getElementById("botaoFecharVenda");
const btnCancelarModalVenda = document.getElementById("botaoCancelarVenda");

const btnLogout = document.getElementById("btnLogout");

// Variáveis de alteração do conteúdo do formulário
const tipoProduto = document.getElementById("tipoProduto");
const form = document.getElementById("formCadastroProduto");
const toastContainer = document.getElementById("toastContainer");
const filtroTipo = document.getElementById("filtroTipo");

const tabelaProdutos = document.querySelector("#tabelaProdutos tbody");

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

function mostrarToast(mensagem, tipo = "sucesso", duracao = 4000) {
  const toast = document.createElement("div");
  toast.classList.add("toast", tipo);

  const icone = document.createElement("span");
  icone.classList.add("icon");
  icone.textContent = tipo === "sucesso" ? "✅" : "⚠️";

  const texto = document.createElement("span");
  texto.textContent = mensagem;

  const btnFechar = document.createElement("button");
  btnFechar.classList.add("fechar-btn");
  btnFechar.innerHTML = "&times;";

  btnFechar.addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => toastContainer.removeChild(toast), 400);
  });

  toast.appendChild(icone);
  toast.appendChild(texto);
  toast.appendChild(btnFechar);
  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  // Remove automaticamente após a duração
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 400);
  }, duracao);
}

// -------- Modais --------
btnAbrirModalEstoque.addEventListener("click", () => {
  modalCadastro.showModal();
  form.reset();
  tipoProduto.value = "";
});

btnFecharModalEstoque.addEventListener("click", () => {
  modalCadastro.close();
  form.reset();
});

btnCancelarModalEstoque.addEventListener("click", () => modalCadastro.close());

modalCadastro.addEventListener("click", (evento) => {
  const reacao = modalCadastro.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalCadastro.close();
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
        mostrarToast("Logout realizado com sucesso!", "sucesso");
        setTimeout(() => {
          window.location.href = "/login";
        }, 800);
      } else {
        mostrarToast("Erro ao sair.", "erro");
      }
    } else {
      mostrarToast("Erro na requisição.", "erro");
    }
  } catch (erro) {
    mostrarToast("Falha na conexão com o servidor.", "erro");
    console.error(erro);
  }
});

// Carregar os produtos
async function carregarProdutos(tipo = "") {
  try {
    let url = "/api/produtos";
    if (tipo) {
      url += `?tipo=${tipo}`;
    }

    const resposta = await fetch(url);
    const produtos = await resposta.json();

    tabelaProdutos.innerHTML = "";

    produtos.forEach((produto) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="linhaTabela">${produto.id}</td>
        <td class="linhaTabela">${produto.nome}</td>
        <td class="linhaTabela">${produto.tipo}</td>
        <td class="linhaTabela">${produto.codigo_original || ""}</td>
        <td class="linhaTabela">R$ ${parseFloat(produto.preco_base).toFixed(
          2
        )}</td>
        <td class="linhaTabela">${produto.marca || ""}</td>
        <td class="linhaTabela">${produto.material || ""}</td>
        <td class="linhaTabela">${produto.tamanho || ""}</td>
        <td class="linhaTabela">${produto.cor || ""}</td>
        <td class="linhaTabela">${new Date(
          produto.data_cadastro
        ).toLocaleDateString("pt-BR")}</td>
        <td class="linhaTabela">${produto.quantidade || 0}</td>
        <td class="linhaTabela acoes">
          <button class="botoesDecisao btnEditarProduto" data-id="${
            produto.id
          }">
            <img src="/static/assets/icons/editar.svg" alt="editar.svg" />
          </button>
          <button class="botoesDecisao btnDeletarProduto" data-id="${
            produto.id
          }">
            <img src="/static/assets/icons/lixeira.svg" alt="lixeira.svg" />
          </button>
        </td>
      `;
      tabelaProdutos.appendChild(tr);
    });
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    mostrarToast("Erro ao carregar produtos", "erro");
  }
}

filtroTipo.addEventListener("change", () => {
  carregarProdutos(filtroTipo.value);
});

function resetarFormulario() {
  form.reset();
  tipoProduto.value = "";
}

function abrirModalCadastro() {
  modalCadastro.showModal();
}

function fecharModalCadastro() {
  modalCadastro.close();
  resetarFormulario();
}

// -------- CRUD produtos --------
form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const dados = {
    nome: document.getElementById("nomeProduto").value,
    tipo: tipoProduto.value,
    codigo_original: document.getElementById("codigoProduto").value,
    preco_base: parseFloat(document.getElementById("precoProduto").value),
    marca: document.getElementById("marcaProduto").value,
    material: document.getElementById("materialProduto").value,
    tamanho: document.getElementById("tamanhoProduto").value,
    cor: document.getElementById("corProduto").value,
    data_cadastro: document.getElementById("dataCadastroProduto").value,
    quantidade_inicial:
      parseInt(document.getElementById("quantidadeProduto").value) || 0,
  };

  if (
    !dados.nome ||
    !dados.tipo ||
    isNaN(dados.preco_base) ||
    dados.preco_base <= 0
  ) {
    mostrarToast("Preencha corretamente todos os campos obrigatórios!", "erro");
    return;
  }

  try {
    const resposta = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      mostrarToast("Produto cadastrado com sucesso!");
      resetarFormulario();
      fecharModalCadastro();
      carregarProdutos(filtroTipo.value);
    } else {
      mostrarToast(resultado.erro || "Erro ao cadastrar produto", "erro");
    }
  } catch (erro) {
    console.error("Erro ao cadastrar produto:", erro);
    mostrarToast("Falha na conexão com o servidor.", "erro");
  }
});

async function editarProduto(id) {
  try {
    const res = await fetch(`/api/produtos/${id}`);
    const produto = await res.json();

    if (!produto) return mostrarToast("Produto não encontrado!", "erro");

    document.getElementById("nomeProduto").value = produto.nome;
    document.getElementById("codigoProduto").value = produto.codigo_original;
    document.getElementById("precoProduto").value = produto.preco_base;
    document.getElementById("marcaProduto").value = produto.marca;
    document.getElementById("materialProduto").value = produto.material;
    document.getElementById("tamanhoProduto").value = produto.tamanho;
    document.getElementById("corProduto").value = produto.cor;
    document.getElementById("dataCadastroProduto").value =
      produto.data_cadastro;
    document.getElementById("quantidadeProduto").value = produto.quantidade;

    tipoProduto.value = produto.tipo;
    tipoProduto.disabled = true;

    abrirModalCadastro();
  } catch (erro) {
    console.error("Erro ao carregar produto:", erro);
    mostrarToast("Erro ao carregar produto.", "erro");
  }
}

// Deletar produto
async function deletarProduto(id) {
  if (!confirm("Deseja realmente deletar este produto?")) return;

  try {
    const res = await fetch(`/api/produtos/${id}`, { method: "DELETE" });
    const resultado = await res.json();

    mostrarToast(resultado.mensagem || "Produto deletado!");
    carregarProdutos(filtroTipo.value);
  } catch (erro) {
    console.error("Erro ao deletar produto:", erro);
    mostrarToast("Erro ao deletar produto.", "erro");
  }
}

document.addEventListener("click", (evento) => {
  const btnEditarProduto = evento.target.closest(".btnEditarProduto");
  const btnDeletarProduto = evento.target.closest(".btnDeletarProduto");

  if (btnEditarProduto) {
    editarProduto(btnEditarProduto.dataset.id);
  }

  if (btnDeletarProduto) {
    deletarProduto(btnDeletarProduto.dataset.id);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();
});
