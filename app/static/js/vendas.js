// Função para calcular automaticamente o valor total quando mudar a quantidade ou preço unitário
function calcularValorTotal() {
  const preco = parseFloat(document.getElementById('precoVenda').value) || 0;
  const quantidade = parseFloat(document.getElementById('quantidadeVenda').value) || 0;
  document.getElementById('valorTotalVenda').value = (preco * quantidade).toFixed(2);
}

// Atualiza valor total em tempo real
document.getElementById('quantidadeVenda').addEventListener('input', calcularValorTotal);
document.getElementById('precoVenda').addEventListener('input', calcularValorTotal);

// Manipula envio do formulário via fetch
document.getElementById('formRegistroVenda').addEventListener('submit', async function (event) {
  event.preventDefault(); // impede envio padrão do form

  // Captura os dados do formulário
  const produto_id = document.getElementById('produtoVenda').value;
  const quantidade = document.getElementById('quantidadeVenda').value;

  // Monta o objeto JSON
  const payload = {
    produto_id: parseInt(produto_id),
    quantidade: parseInt(quantidade)
  };

  try {
    const resposta = await fetch('/venda_bp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert(`✅ ${dados.mensagem}\nEstoque atual: ${dados.estoque_atual}`);
      // Fecha o modal
      document.getElementById('modalRegistroVenda').close();
      // Aqui você pode atualizar tabela de estoque ou limpar o formulário
    } else {
      alert(`❌ Erro: ${dados.erro}`);
    }
  } catch (erro) {
    console.error('Erro ao enviar venda:', erro);
    alert('Erro ao comunicar com o servidor.');
  }
});

// Botão cancelar do modal
document.getElementById('botaoCancelarVenda').addEventListener('click', function () {
  document.getElementById('modalRegistroVenda').close();
});

// Botão fechar do modal
document.getElementById('botaoFecharVenda').addEventListener('click', function () {
  document.getElementById('modalRegistroVenda').close();
});
