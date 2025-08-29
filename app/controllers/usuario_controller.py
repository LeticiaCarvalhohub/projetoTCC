from flask import Blueprint, request, jsonify, session, redirect, render_template
from app.models.usuario import verificar_usuario

usuario_bp = Blueprint("usuario", __name__)

@usuario_bp.route("/")
def home():
  # if 'usuario' in session:
    return render_template("painelControle.html")
  # else:
    return redirect("/login")
  
@usuario_bp.route("/login", methods=["GET"])
def login():
  # if 'usuario' in session:
    return redirect("/painelPrincipal")
  # return render_template("login.html")

@usuario_bp.route("/login", methods=["POST"])
def verificarLogin():
  data = request.get_json()
  login = data.get("usuario")
  senha = data.get("senha")
  estado = data.get("estado")

  user = verificar_usuario(login, senha, estado)
  if user:
    session["usuario"] = login
    return jsonify({"sucesso": True})
  else:
    return jsonify({"sucesso": False, "mensagem": "Credenciais inválidas"}), 401
  
@usuario_bp.route("/painelPrincipal")
def painelPrincipal():
  # if 'usuario' in session:
    return render_template("painelControle.html")
  # else:
    return redirect("/login")
  
@usuario_bp.route("/logout", methods=["POST"])
def logout():
  session.clear()
  return jsonify({"secesso": True})