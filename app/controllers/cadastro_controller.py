from flask import Blueprint, request, jsonify
from models.linha import create_linha
from models.tecido import create_tecido
from models.produtos_extras import create_produtos_extra

cadastro_bp = Blueprint("cadastro",__name__)

@cadastro_bp.route("/cadastro", methods=["POST"])
def cadastro():
    dados = request.get_json()
    tipo = dados.get("tipo")

    if not tipo:
        return jsonify({"erro": "Informe o tipo (linha, tecido ou extra)!"}),400
    
#Cadastro de linhas
    if tipo == "linha":
        nome = dados.get("nome")
        marca = dados.get("marca")
        cor = dados.get("cor")
        codigo_cor = dados.get("codigo_cor")
        tipo_linha = dados.get("tipo_linha")
        material= dados.get("material")
        comprimento_metros = dados.get("comprimento_metros")
        espessura= dados.get("espessura")
        preco_base= dados.get("preco_base")
        data_cadastro= dados.get("data_cadastro")


        if not all ([nome, marca, cor, codigo_cor, tipo, material, comprimento_metros, espessura, preco_base, data_cadastro]):
            return jsonify({"erro": "Todos os campos são obrigatórios!"}),400
        
        create_linha(nome, marca, cor, codigo_cor, tipo, material, comprimento_metros, espessura, preco_base, data_cadastro)
        return jsonify ({"mensagem": "Linha cadastrada com sucesso!"}),201
    
#Cadastro de Tecido
    elif tipo == "tecido":
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

        if not all([nome, marca,tipo_tecido, estampa, cor, largura_cm, preco_metro, composicao, peso_g_m2, data_cadastro]):
            return jsonify({"erro": "Todos os campos são obrigatórios"}),400
        
        create_tecido(nome, marca,tipo_tecido, estampa, cor, largura_cm, preco_metro, composicao, peso_g_m2, data_cadastro)
        return jsonify ({"mensagem": "Tecido cadastrado com sucesso!"}),201
    
#Cadastro de Produto extra
    elif tipo == "extra":
        nome = dados.get("nome")
        categoria = dados.get("categoria")
        marca = dados.get("marca")
        cor = dados.get("cor")
        tamanho = dados.get("tamanho")
        material = dados.get("material")
        preco_base = dados.get("preco_base")
        unidade_medida = dados.get("unidade_medida")
        data_cadastro = dados.get("data_cadastro")
        
    
        if not all([nome, categoria, marca, cor, tamanho, material, preco_base, unidade_medida, data_cadastro]):
            return jsonify({"erro": "¨Todos os campos são obrigatório"}),400
        
        create_produtos_extra(nome, categoria, marca, cor, tamanho, material, preco_base, unidade_medida, data_cadastro)
        return jsonify ({"mensagem": "Produto extra cadastrado com sucesso!"}),201
    else:
      return jsonify ({"mensagem": "Tipo inválido! Use linha, tecido ou extra."}),400
