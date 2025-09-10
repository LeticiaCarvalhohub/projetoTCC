from flask import Blueprint, request, jsonify
from app.models.produtos_extras import get_produto_extra, insert_produtos_extras, update_produtos_extras, delete_produtos_extras

produtos_extras_bp = Blueprint("/api/produtos_extras", __name__)

@produtos_extras_bp.route("/api/produtos_extras")
def listar_produtos_extra():
    produto_extra = get_produto_extra()
    return jsonify(produto_extra)

@produtos_extras_bp.route("/api/produtos_extras", methods=["POST"])
def adicionar_produtos_extras():
    dado = request.get_json()
    insert_produtos_extras(dado["nome"], dado["categoria"], dado["marca"], dado["cor"],dado["tamanho"], dado["material"], dado["preco_metro"], dado["unidade_medida"], dado["data_cadastro"])
    return jsonify({"mensagem": "Produto adicionado com sucesso!"})

@produtos_extras_bp.route("/api/produtos_extras/<codigo_extra>", methods=["PUT"])
def atualizar_produtos_extras(codigo_extra):
    dado = request.get_json()
    update_produtos_extras(codigo_extra, dado["nome"], dado["categoria"], dado["marca"], dado["cor"], dado["tamanho"],dado["material"], dado["preco_metro"], dado["unidade_medida"], dado["data_cadastro"])
    return jsonify({"mensagem": "Produto atualizado com sucesso!"})

@produtos_extras_bp.route("/api/produtos_extras/<codigo_extra>", methods=["DELETE"])
def remover_produtos_extras(codigo_extra):
    delete_produtos_extras(codigo_extra)
    return jsonify({"mensagem": "Produto deletado com sucesso!"})