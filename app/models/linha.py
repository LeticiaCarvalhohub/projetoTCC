from app.models import conexaoBD

def get_linha():
    conexao = conexaoBD()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("""
        SELECT codigo_linha, nome, marca, cor, codigo_cor, tipo, material, comprimento_metros, espessura, preco_base, data_cadastro FROM linhas
    """)
    tecidos = cursor.fetchall()
    cursor.close()
    conexao.close()
    return tecidos

def insert_linhas(codigo_linha, nome, marca, cor, codigo_cor, tipo, material, comprimento_metros, espessura, preco_base, data_cadastro):
    conexao = conexaoBD()
    cursor = conexao.cursor()
    cursor.execute("INSERT INTO linha(codigo_linha, nome, marca, cor, codigo_cor, tipo, material, comprimento_metros, espessura, preco_base, data_cadastro) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(codigo_linha, nome, marca, cor, codigo_cor, tipo, material, comprimento_metros, espessura, preço_base, data_cadastro))
    conexao.commit()
    cursor.close()
    conexao.close()


def update_linha(codigo_linha, dado: dict):
    conexao = conexaoBD()
    cursor = conexao.cursor()

    campos = []
    valores = []

    mapa = {
        "nome": "nome",
        "marca": "marca",
        "cor": "cor",
        "codigo_cor": "codigo_cor",
        "tipo": "tipo",
        "material": "material",
        "comprimento_metros": "comprimento_metros",
        "espessura": "espessura",
        "preco_base": "preco_base",
        "data_cadastro": "data_cadastro"
    }

    for chave, coluna in mapa.itens():
        if chave in dado:
            campos.append(f"{coluna}=%s")
            valores.append(dado[chave])

    if campos:
        sql = f"UPDATE linhas SET {', '.join(campos)} WHERE codigo_linha=%s"
        valores.append(codigo_linha)
        cursor.execute(sql, valores)
        conexao.commit()

    cursor.close()
    conexao.close()


def delete_linhas(codigo_linha):
    conexao = conexaoBD()
    cursor = conexao.cursor()
    cursor.execute("DELETE FROM linhas WHERE codigo_linha=%s",(codigo_linha,))
    conexao.commit()
    cursor.close()
    conexao.close()
