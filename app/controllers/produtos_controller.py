from flask import Blueprint, request, jsonify
from app.models.produto import get_produtos, insert_produtos, update_produto, delete_produto

produto_bp = Blueprint("produto", __name__)

@produto_bp.route("/api/produtos", methods=["GET"])
def listar_produtos():
    tipo = request.args.get("tipo")
    produtos = get_produtos(tipo)
    return jsonify(produtos)

@produto_bp.route("/api/produtos", methods=["POST"])
def adicionar_produto():
    try:
        dados = request.get_json()
        if not dados:
            return jsonify({"erro": "JSON inválido ou vazio"}), 400

        # Cria o produto cadastrado e o estoque inicial do produto
        produto_id = insert_produtos(dados)
        return jsonify({"mensagem": "Produto adicionado com sucesso!", "id": produto_id}), 201
    except Exception as err:
        return jsonify({"erro": str(err)}), 400 

@produto_bp.route("/api/produtos/<int:produto_id>", methods=["PUT"])
def atualizar_produto(produto_id):
    try: 
        dados = request.get_json()
        if not dados:
            return jsonify({"erro": "JSON inválido ou vazio"}), 400
        
        update_produto(produto_id, dados)
        return jsonify({"mensagem": "Produto atualizado com sucesso!"})
    except Exception as err:
        return jsonify({"erro": str(err)}), 400
    

@produto_bp.route("/api/produtos/<int:produto_id>", methods=["DELETE"])
def remover_produto(produto_id):
    try:
        delete_produto(produto_id)
        return jsonify({"mensagem": "Produto deletado com sucesso!"})
    except Exception as err:
        return jsonify({"erro:": str(err)}), 400