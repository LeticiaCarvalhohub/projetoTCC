from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

def conexaoBD():
    return mysql.connector.connect(
        host='br418.hostgator.com.br:3306',
        user='etemfl83_tudonocontrole',
        password='P@=+nCxJzmy(',
        database='tudonocontrole'
    )

@app.route('/dados-estoque')
def dados_estoque():
    conexao = conexaoBD()
    cursor = conexao.cursor()

    # Ajuste os limites conforme sua regra
    # Exemplo:
    # >=10 → em estoque
    # 1 a 9 → baixo estoque
    # 0 → não está em estoque

    cursor.execute("SELECT COUNT(*) FROM itens WHERE quantidade >= 10")
    em_estoque = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM itens WHERE quantidade BETWEEN 1 AND 9")
    baixo_estoque = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM itens WHERE quantidade = 0")
    nao_estoque = cursor.fetchone()[0]

    cursor.close()
    conexao.close()

    return jsonify({
        "em_estoque": em_estoque,
        "baixo_estoque": baixo_estoque,
        "nao_estoque": nao_estoque 
        })
        

if __name__ == '__main__':
    app.run(debug=True)