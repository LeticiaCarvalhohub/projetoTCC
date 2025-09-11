from flask import Blueprint, request, jsonify
from app.models.produtos_extras import get_produto_extra, insert_produtos_extras, update_produtos_extras, delete_produtos_extras


produtos_extras_bp = Blueprint("/api/produtos_extras", __name__)

@produtos_extras_bp.route("/api/produtos_extras")
def listar_produtos_extra():
    produto_extra = get_produto_extra()
    return jsonify(produto_extra)

@produtos_extras_bp.route("/api/produtos_extras", methods=["POST"])
def adicionar_produtos_extras():
    dados = request.get_json()

    nome = dados.get("nome")
    categoria = dados.get("categoria")
    marca = dados.get("marca")
    cor = dados.get("cor")
    tamanho = dados.get("tamanho")
    material = dados.get("material")
    preco_base = dados.get("preco_base")
    unidade_medida = dados.get("unidade_medida")
    data_cadastro = dados.get("data_cadastro")
        

    insert_produtos_extras(nome,categoria,marca,cor,tamanho,material,preco_base,unidade_medida,data_cadastro)
    return jsonify({"mensagem": "Produto adicionado com sucesso!"})

@produtos_extras_bp.route("/api/produtos_extras/<codigo_extra>", methods=["PUT"])
def atualizar_produtos_extras(codigo_extra):
    dados = request.get_json()
    update_produtos_extras(codigo_extra, dados)
    return jsonify({"mensagem": "Produto atualizado com sucesso!"})

@produtos_extras_bp.route("/api/produtos_extras/<codigo_extra>", methods=["DELETE"])
def remover_produtos_extras(codigo_extra):
    delete_produtos_extras(codigo_extra)
    return jsonify({"mensagem": "Produto deletado com sucesso!"})