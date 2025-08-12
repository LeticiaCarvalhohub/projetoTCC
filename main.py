from flask import Flask,render_template,request,session,redirect

app = Flask(__name__)
app.secret_key = "AVNL"
bancoDeDados = [
        {
          "usuario": "Admin",
          "senha": "123", 
          "estado": "Administrador"
        },
        {
          "usuario": "Funcionario",
          "senha": "123", 
          "estado": "Funcionario"
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
    return redirect('/')
  else:
    return render_template("login.html")
  
@app.route("/login", methods= ['POST'])
def verificarLogin():
  login = request.form['usuario']
  senha = request.form['senha']
  estado = request.form['estado']

  for user in bancoDeDados:
    if(login == user['usuario'] and senha == user['senha'] and estado == user['estado']):
      session['usuario'] = login
      return redirect('/')
  return render_template('login.html')


