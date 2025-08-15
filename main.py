from flask import Flask, render_template, request, session, redirect, jsonify

app = Flask(__name__, static_folder="app/static")
app.secret_key = "AVNL"
bancoDeDados = [
        {
          "usuario": "Eduardo de Sousa",
          "senha": "12345", 
          "estado": "Administrador"
        },
        {
          "usuario": "Funcionario",
          "senha": "123", 
          "estado": "Funcionário"
        },
    ]

@app.route("/")
def home():
  if('usuario' in session):
    return render_template("painelControle.html")
  else:
    return redirect("/login")
  
@app.route("/login")
def login():
  if('usuario' in session):
    return redirect('/painelPrincipal')
  else:
    return render_template("login.html")
  
@app.route("/login", methods= ['POST'])
def verificarLogin():
  data = request.get_json()
  login = data.get('usuario')
  senha = data.get('senha')
  estado = data.get('estado')

  for user in bancoDeDados:
    if(login == user['usuario'] and senha == user['senha'] and estado == user['estado']):
      session['usuario'] = login
      return jsonify({"sucesso": True})
  return jsonify({"sucesso": False, "mensagem": "Credenciais inválidas."}), 401

@app.route("/painelPrincipal")
def painelPrincipal():
    if 'usuario' in session:
        return render_template("painelControle.html")
    else:
        return redirect("/login")

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"sucesso": True})


