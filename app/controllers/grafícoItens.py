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

@app.route('/dados-itens')
def dados_itens():
    conexao = conexaoBD()
    cursor = conexao.cursor()


    cursor.execute("SELECT COUNT(*) FROM linhas")
    linhas = cursor.fetchone()[0]


    cursor.execute("SELECT COUNT(*) FROM tecidos")
    tecidos = cursor.fetchone()[0]


    cursor.execute("SELECT COUNT(*) FROM produtos_extras")
    extras = cursor.fetchone()[0]


    cursor.close()
    conexao.close()


    return jsonify({
        "linhas": linhas,
        "tecidos": tecidos,
        "extras": extras
    })

if __name__ == '__main__':
    app.run(debug= True)