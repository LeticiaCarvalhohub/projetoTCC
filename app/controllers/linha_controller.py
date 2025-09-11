from flask import Blueprint, request, jsonify
from app.models.linha import get_linha, insert_linhas, update_linha, delete_linhas 


linha_bp = Blueprint("linha", __name__)

@linha_bp.route("/api/linha")
def listar_linha():
    linha = get_linha()
    return jsonify(linha)

@linha_bp.route("/api/linha", methods=["POST"])
def adicionar_linha():
    dados = request.get_json()

    codigo_linha = dados.get("codigo_linha")
    nome = dados.get("nome")
    marca = dados.get("marca")
    cor = dados.get("cor")
    codigo_cor = dados.get("codigo_cor")
    tipo = dados.get("tipo_linha")
    material = dados.get("material")
    comprimento_metros = dados.get("comprimento_metros")
    espessura = dados.get("espessura")
    preco_base = dados.get("preco_base")
    data_cadastro = dados.get("data_cadastro")

    insert_linhas(codigo_linha,nome,marca,cor,codigo_cor,tipo,material,comprimento_metros,espessura,preco_base,data_cadastro)
    return jsonify({"mensagem": "Linha adicionada com sucesso!"})

@linha_bp.route("/api/linha/<codigo_linha>", methods=["PUT"])
def atualizar_linha(codigo_linha):
    dados = request.get_json()
    update_linha(codigo_linha, dados)
    
    return jsonify({"mensagem": "Linha atualizada com sucesso!"})

@linha_bp.route("/api/linha/<codigo_linha>", methods=["DELETE"])
def remover_linha(codigo_linha):
    delete_linhas(codigo_linha)
    return jsonify({"mensagem": "Linha deletada com sucesso!"})