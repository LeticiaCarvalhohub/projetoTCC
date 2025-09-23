from flask import Blueprint, request, jsonify
from app.models.produto import get_produtos, get_produtos_id, get_produtos_inativos, insert_produtos, update_produto, inative_produto, reative_produto, get_quantidade_total, get_baixo_estoque, get_sem_estoque

produto_bp = Blueprint("produto", __name__)

@produto_bp.route("/api/produtos", methods=["GET"])
def listar_produtos():
    tipo = request.args.get("tipo")
    produtos = get_produtos(tipo)
    return jsonify(produtos)

@produto_bp.route("/api/produtos/inativos", methods=["GET"])
def buscar_produtos_inativos():
    try:
        produtos = get_produtos_inativos()
        return jsonify(produtos), 200
    except Exception as err:
        return jsonify({"erro": str(err)}), 400

@produto_bp.route("/api/produtos/<int:produto_id>", methods=["GET"])
def buscar_produto_id(produto_id):
    produto = get_produtos_id(produto_id)
    if produto:
        return jsonify(produto)
    return jsonify({"erro": "Produto não encontrado"}), 404


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
        
        existente = get_produtos_id(produto_id)
        if not existente:
            return jsonify({"erro": "Produto não encontrado"}), 404
        
        update_produto(produto_id, dados)
        return jsonify({"mensagem": "Produto atualizado com sucesso!"})
    except Exception as err:
        return jsonify({"erro": str(err)}), 400
    

@produto_bp.route("/api/produtos/<int:produto_id>", methods=["DELETE"])
def inativar_produto(produto_id):
    try:
        inative_produto(produto_id)
        return jsonify({"mensagem": "Produto inativado com sucesso!"}), 200
    except Exception as err:
        return jsonify({"erro": str(err)}), 400
    
@produto_bp.route("/api/produtos/reativar/<int:produto_id>", methods=["PUT"])
def reativar_produto(produto_id):
    try:
        reative_produto(produto_id)
        return jsonify({"mensagem": "Produto reativado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 400

@produto_bp.route("/api/produtos/resumo", methods=["GET"])
def resumo_produtos():
    resumo = {
        "total": get_quantidade_total(),
        "baixo_estoque": get_baixo_estoque(),
        "sem_estoque": get_sem_estoque()
    }
    return jsonify(resumo)