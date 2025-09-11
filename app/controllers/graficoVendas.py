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

@app.route('/dados-vendas')
def dados_vendas():
    conexao = conexaoBD()
    cursor = conexao.cursor()


    # Somar valor vendido por semana no mês atual
    # Ajuste os nomes das colunas/tabelas para o seu banco 
    cursor.execute("""
        SELECT semana, SUM(valor_venda) as total
        FROM vendas
        WHERE MONTH(data_venda) = MONTH(CURDATE())
        GROUP BY semana 
        ORDER BY semana     
    """)

    resultados = cursor.fetchall()

    # transforma em listas
    semanas = []
    totais = []
    for semana, total in resultados:
        semanas.append(f"Semana {semana}")
        totais.append(float(total))

    cursor.close()
    conexao.close()

    return jsonify({
        "labels": semanas,
        "dados": totais
    })    


if __name__ == '__main__':
    app.run(debug=True)