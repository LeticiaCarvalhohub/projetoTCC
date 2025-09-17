from app.controllers import conexaoBD
from flask import Flask, jsonify

app = Flask(__name__)

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