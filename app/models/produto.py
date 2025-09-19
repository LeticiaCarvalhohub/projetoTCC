from app.models import conexaoBD
from datetime import date

def get_produtos(tipo=None):
    conexao = conexaoBD()
    try: 
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT p.id, p.nome, p.tipo, p.codigo_original, p.preco_base, 
                   p.marca, p.tamanho, p.cor, p.data_cadastro, e.quantidade
            FROM produto p
            JOIN estoque e ON p.id = e.produto_id
        """
        if tipo: 
            sql += " WHERE p.tipo=%s"
            cursor.execute(sql, (tipo,))
        else:
            cursor.execute(sql)
        produtos = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return produtos


def insert_produtos(dados: dict):
    conexao = conexaoBD()
    try: 
        cursor = conexao.cursor()
        sql = """
            INSERT INTO produto 
            (nome, tipo, codigo_original, preco_base, marca, tamanho, cor, data_cadastro)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
        """
        data_cadastro = dados.get('data_cadastro', date.today())
        cursor.execute("""
            INSERT INTO produto 
            (nome, tipo, codigo_original, preco_base, marca, tamanho, cor, data_cadastro)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            dados['nome'], dados['tipo'], dados.get('codigo_original'),
            dados['preco_base'], dados.get('marca'), 
            dados.get('tamanho'), dados.get('cor'), data_cadastro
        ))

        produto_id = cursor.lastrowid
        # Cria estoque inicial
        cursor.execute("INSERT INTO estoque (produto_id, quantidade) VALUES (%s, %s)", (produto_id, dados.get('quantidade_inicial', 0)))
        conexao.commit()
        return produto_id
    finally:
        cursor.close()
        conexao.close()


def update_produto(produto_id, dados: dict):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        campos = []
        valores = []

        mapa = {
            "nome": "nome",
            "tipo": "tipo",
            "codigo_original": "codigo_original",
            "preco_base": "preco_base",
            "marca": "marca",
            "tamanho": "tamanho",
            "cor": "cor",
            "data_cadastro": "data_cadastro"
        }

        for chave, coluna in mapa.items():
            if chave in dados:
                campos.append(f"{coluna}=%s")
                valores.append(dados[chave])

        if campos:
            sql = f"UPDATE produto SET {', '.join(campos)} WHERE id=%s"
            valores.append(produto_id)
            cursor.execute(sql, valores)
    
        #atualiza o estoque se for preenchido
        if 'quantidade' in dados and ['quantidade'] not in [None, ""]:
            cursor.execute("UPDATE estoque SET quantidade=%s WHERE produto_id=%s", (dados['quantidade'], produto_id))

        conexao.commit()
    finally:
        cursor.close()
        conexao.close()


def delete_produto(produto_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        cursor.execute("DELETE FROM produto WHERE id=%s",(produto_id,))
        conexao.commit()
    finally:
        cursor.close()
        conexao.close()

def get_quantidade_total():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT SUM(quantidade) as total FROM estoque")
        resultado = cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()
    return resultado["total"] if resultado["total"] else 0

def get_baixo_estoque(limite=30):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT COUNT(*) as baixo_estoque FROM estoque WHERE quantidade < %s AND quantidade > 0", (limite,))
        resultado = cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()
    return resultado["baixo_estoque"] if resultado["baixo_estoque"] else 0

def get_sem_estoque():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT COUNT(*) as sem_estoque FROM estoque WHERE quantidade = 0")
        resultado = cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()
    return resultado["sem_estoque"] if resultado["sem_estoque"] else 0