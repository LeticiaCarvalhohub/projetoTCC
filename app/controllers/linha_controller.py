from flask import Blueprint, request, jsonify
from app.models.linha import get_linha, insert_linhas, update_linha, delete_linhas

linha_bp = Blueprint("linha", __name__)

@linha_bp.route("/api/linha")
def listar_linha():
    linha = get_linha()
    return jsonify(linha)

@linha_bp.route("/api/linha", methods=["POST"])
def adicionar_linha():
    dado = request.get_json()
    insert_linhas(
        dado["nome"], 
        dado["marca"], 
        dado["cor"],
        dado["codigo_cor"], 
        dado["tipo"], 
        dado["material"], 
        dado["comprimento_metros"],
        dado["espessura"], 
        dado["preco_base"], 
        dado["data_cadastro"]
    )
    return jsonify({"mensagem": "Linha adicionada com sucesso!"})

@linha_bp.route("/api/linha/<codigo_linha>", methods=["PUT"])
def atualizar_linha(codigo_linha):
    dado = request.get_json()
    update_linha(codigo_linha, dado)
    
    return jsonify({"mensagem": "Linha atualizada com sucesso!"})

@linha_bp.route("/api/linha/<codigo_linha>", methods=["DELETE"])
def remover_linha(codigo_linha):
    delete_linhas(codigo_linha)
    return jsonify({"mensagem": "Linha deletada com sucesso!"})