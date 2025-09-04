from app.models import conexaoBD

def insert_produtos_extras(nome, categoria, marca, cor, tamanho, material, preço_base, unidade_medida, data_cadastro):
    conexao = conexaoBD()
    cursor = conexao.cursor()
    cursor.execute("INSERT INTO prodrutos_extras(nome, categoria, marca, cor, tamanho, material, preço_base, unidade_medida, data_cadastro) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(nome, categoria, marca, cor, tamanho, material, preço_base, unidade_medida, data_cadastro))
    conexao.commit()
    cursor.close()
    conexao.close()


def update_produtos_extras(codigo_extra, dado):
    conexao = conexaoBD()
    cursor = conexao.cursor()

    campos = []
    valores = []

    if "nome" in dado:
        campos.append("nome=%s")
        valores.append(dado["nome"])

    if "categoria" in dado:
        campos.append("categoria=%s")
        valores.append(dado["categoria"])

    if "marca" in dado:
        campos.append("marca=%s")
        valores.append(dado["marca"])

    if "cor" in dado:
        campos.append("cor=%s")
        valores.append(dado["cor"])

    if "tamanho" in dado:
        campos.append("tamanho=%s")
        valores.append(dado["tamanho"])

    if "material" in dado:
        campos.append("material=%s")
        valores.append(dado["material"])

    if "preco_base" in dado:
        campos.append("preco_base=%s")
        valores.append(dado["preco_base"])

    if "unidade_medida" in dado:
        campos.append("unidade_medida=%s")
        valores.append(dado["unidade_medida"])

    if "data_cadastro" in dado:
        campos.append("data_cadastro=%s")
        valores.append(dado["data_cadastro"])

    # Monta o UPDATE só com os campos enviados
    sql = f"UPDATE produtos_extras SET {', '.join(campos)} WHERE id=%s"
    valores.append(codigo_extra)

    cursor.execute(sql, valores)
    conexao.commit()
    cursor.close()
    conexao.close()


def delete_produtos_extras(codigo_extra):
    conexao = conexaoBD()
    cursor = conexao.cursor()
    cursor.execute("DELETE FROM produtos_extras WHERE codigo_extra=%s",(codigo_extra))
    conexao.commit()
    cursor.close()
    conexao.close()
