import mysql.connector
from config import Config

try:
  def conexaoBD():
    return mysql.connector.connect(
      host=Config.DB_HOST,
      user=Config.DB_USER,
      password=Config.DB_PASSWORD,
      database=Config.DB_NAME
    )
  print("Conexão bem-sucedida!")
except mysql.connector.Error as err:
  print(f"Erro: {err}")

def verificar_usuario(usuario, senha, estado):
  conexao = conexaoBD()
  cursor = conexao.cursor(dictionary=True)
  cursor.execute("SELECT * FROM usuarios WHERE usuario = %s AND senha = %s AND estado = %s", (usuario, senha, estado))
  user = cursor.fetchone()
  cursor.close()
  conexao.close()
  return user