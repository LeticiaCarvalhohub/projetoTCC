from flask import Blueprint, request, jsonify
from app.models.tecido import *

tecido_bp = Blueprint("tecido", __name__)

@tecido_bp.route("/tecido")
def listar_tecido():
    tecido = listar_tecido()
    return jsonify(tecido)

@tecido_bp.route("/tecido", methods=["POST"])
def adicionar_tecido():
    dado = request.get_json()
    insert_tecidos(dado["nome"], dado["marca"], dado["tipo_tecido"], dado["estampa"], dado["cor"], dado["largura_cm"], dado["preco_metro"], dado["composicao"], dado["peso_g_m2"], dado["data_cadastro"])
    return jsonify({"mensagem": "Tecido adicionado com sucesso!"})

@tecido_bp.route("/tecido/<int:codigo_tecido>", methods=["PUT"])
def atualizar_tecido(codigo_tecido):
    dado = request.get_json()
    update_tecido(codigo_tecido, dado["nome"], dado["marca"], dado["tipo_tecido"], dado["estampa"],dado["cor"], dado["largura_cm"], dado["preco_metro"], dado["composicao"], dado["peso_g_m2"], dado["data_cadastro"])
    return jsonify({"mensagem": "Tecido atualizado com sucesso!"})

@tecido_bp.route("/tecido/<int:codigo_tecido>", methods=["DELETE"])
def remover_tecido(codigo_tecido):
    delete_tecidos(codigo_tecido)
    return jsonify({"mensagem": "Tecido deletado com sucesso!"})