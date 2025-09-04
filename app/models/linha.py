from app.models import conexaoBD

def insert_linhas(nome, marca, cor, codigo_cor, tipo, material, comprimento_metros, espessura, preço_base, data_cadastro):
    conexao = conexaoBD()
    cursor = conexao.cursor()
    cursor.execute("INSERT INTO linha(nome, marca, cor, codigo_cor, tipo, material, comprimento_metros, espessura, preço_base, data_cadastro) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(nome, marca, cor, codigo_cor, tipo, material, comprimento_metros, espessura, preço_base, data_cadastro))
    conexao.commit()
    cursor.close()
    conexao.close()


def update_linha(codigo_linha, dado):
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

    if "cor" in dado:
        campos.append("cor=%s")
        valores.append(dado["cor"])

    if "codigo_cor" in dado:
        campos.append("cogigo_cor=%s")
        valores.append(dado["codigo_cor"])

    if "tipo" in dado:
        campos.append("tipo=%s")
        valores.append(dado["tipo"])

    if "material" in dado:
        campos.append("material=%s")
        valores.append(dado["material"])

    if "comprimento_metros" in dado:
        campos.append("comprimento_metros=%s")
        valores.append(dado["comprimento_metros"])

    if "espessura" in dado:
        campos.append("espessura=%s")
        valores.append(dado["espessura"])

    if "preco_base" in dado:
        campos.append("preco_base=%s")
        valores.append(dado["preco_base"])

    if "data_cadastro" in dado:
        campos.append("data_cadastro=%s")
        valores.append(dado["data_cadastro"])

    # Monta o UPDATE só com os campos enviados
    sql = f"UPDATE linha SET {', '.join(campos)} WHERE id=%s"
    valores.append(codigo_linha)

    cursor.execute(sql, valores)
    conexao.commit()
    cursor.close()
    conexao.close()


def delete_linhas(codigo_linha):
    conexao = conexaoBD()
    cursor = conexao.cursor()
    cursor.execute("DELETE FROM linha WHERE codigo_linha=%s",(codigo_linha))
    conexao.commit()
    cursor.close()
    conexao.close()
