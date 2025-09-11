from flask import Blueprint, request, jsonify
from app.models.tecido import get_tecido, insert_tecidos, update_tecido, delete_tecidos


tecido_bp = Blueprint("/api/tecido", __name__)

@tecido_bp.route("/api/tecido")
def listar_tecido():
    tecido = get_tecido()
    return jsonify(tecido), 200

@tecido_bp.route("/api/tecido", methods=["POST"])
def adicionar_tecido():
    dados = request.get_json()
    
    nome = dados.get("nome")
    marca = dados.get("marca")
    tipo_tecido = dados.get("tipo_tecido")
    estampa = dados.get("estampa")
    cor = dados.get("cor")
    largura_cm = dados.get("largura_cm")
    preco_metro = dados.get("preco_metro")
    composicao = dados.get("composicao")
    peso_g_m2 = dados.get("peso_g_m2")
    data_cadastro = dados.get("data_cadastro")

    insert_tecidos(nome,marca,tipo_tecido,estampa,cor,largura_cm,preco_metro,composicao,peso_g_m2,data_cadastro)
    return jsonify({"mensagem": "Tecido adicionado com sucesso!"})

@tecido_bp.route("/api/tecido/<codigo_tecido>", methods=["PUT"])
def atualizar_tecido(codigo_tecido):
    dados = request.get_json()
    update_tecido(codigo_tecido, dados)
    return jsonify({"mensagem": "Tecido atualizado com sucesso!"})

@tecido_bp.route("/api/tecido/<codigo_tecido>", methods=["DELETE"])
def remover_tecido(codigo_tecido):
    delete_tecidos(codigo_tecido)
    return jsonify({"mensagem": "Tecido deletado com sucesso!"})