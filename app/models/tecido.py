from app.models import conexaoBD

def get_tecido():
    conexao = conexaoBD()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("""
        SELECT codigo_tecido, nome, marca, tipo_tecido, estampa, cor, largura_cm, preco_metro, composicao, peso_g_m2, data_cadastro
        FROM tecidos
    """)
    tecidos = cursor.fetchall()
    cursor.close()
    conexao.close()
    return tecidos

def insert_tecidos(nome, marca,tipo_tecido, estampa, cor, largura_cm, preco_metro, composicao, peso_g_m2, data_cadastro):
    conexao = conexaoBD()
    cursor = conexao.cursor()
    cursor.execute("INSERT INTO tecidos(nome, marca, tipo_tecido, estampa, cor, largura_cm, preco_metro, composicao, peso_g_m2, data_cadastro) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (nome, marca, tipo_tecido, estampa, cor, largura_cm, preco_metro, composicao, peso_g_m2, data_cadastro))
    conexao.commit()
    cursor.close()
    conexao.close()

def update_tecido(codigo_tecido, dado):
    conexao = conexaoBD()
    cursor = conexao.cursor()

    campos = []
    valores = []

    if "nome" in dado:
        campos.append("nome=%s")
        valores.append(dado["nome"])

    if "marca" in dado:
        campos.append("marca=%s")
        valores.append(dado["marca"])

    if "tipo_tecido" in dado:
        campos.append("tipo_tecido=%s")
        valores.append(dado["tipo_tecido"])

    if "estampa" in dado:
        campos.append("estampa=%s")
        valores.append(dado["estampa"])

    if "cor" in dado:
        campos.append("cor=%s")
        valores.append(dado["cor"])

    if "largura_cm" in dado:
        campos.append("largura_cm=%s")
        valores.append(dado["largura_cm"])

    if "preco_metro" in dado:
        campos.append("preco_metro=%s")
        valores.append(dado["preco_metro"])

    if "composicao" in dado:
        campos.append("composicao=%s")
        valores.append(dado["composicao"])

    if "peso_g_m2" in dado:
        campos.append("peso_g_m2=%s")
        valores.append(dado["peso_g_m2"])

    if "data_cadastro" in dado:
        campos.append("data_cadastro=%s")
        valores.append(dado["data_cadastro"])

    sql = f"UPDATE tecidos SET {', '.join(campos)} WHERE codigo_tecido=%s"
    valores.append(codigo_tecido)

    cursor.execute(sql, valores)
    conexao.commit()
    cursor.close()
    conexao.close()


def delete_tecidos(codigo_tecido):
    conexao = conexaoBD()
    cursor = conexao.cursor()
    cursor.execute("DELETE FROM tecidos WHERE codigo_tecido=%s",(codigo_tecido))
    conexao.commit()
    cursor.close()
    conexao.close()
