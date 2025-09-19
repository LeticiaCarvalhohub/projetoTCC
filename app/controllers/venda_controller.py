from flask import Blueprint, request, jsonify
from app import db
from app.models.produto import Produto
from app.models.venda import Venda


venda_bp = Blueprint('venda_bp', __name__)

@venda_bp.route('/venda_bp', methods=['POST'])
def registrar_venda():
    dados = request.get_json()
    produto_id = dados.get('produto_id')
    quantidade = dados.get('quantidade')

    if not produto_id or not quantidade:
        return jsonify({'erro': 'Campos obrigatórios: produto_id e quantidade'}), 400
    
    # Buscar o produto no estoque
    produto = Produto.query.get(produto_id)
    if not produto:
        return jsonify({'erro': 'Produto não encontrado'}), 404
    
    # Verificar estoque
    if produto.quantidade_estoque < quantidade:
        return jsonify({'erro': 'Estoque insuficiente'}),400
    
    # Calcular valor total 
    valor_total = quantidade * produto.precoVenda

    # Criar registro da venda
    venda = Venda(produto_id=produto_id,
                  quantidade=quantidade,
                  valor_total=valor_total)
    
    # Atualizar estoque
    produto.quantidade_estoque -= quantidade

    # Commit
    db.session.add(venda)
    db.session.commit()


    return jsonify({'mensagem': 'Venda registrada com sucesso',
                    'venda_id': venda.id,
                    'estoque_atual': produto.quantidade_estoque}), 201