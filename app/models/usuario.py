from app.models import conexaoBD

def verificar_usuario(email, senha, status):
  conexao = conexaoBD()
  cursor = conexao.cursor(dictionary=True)
  cursor.execute("SELECT * FROM usuario WHERE email = %s AND senha = %s AND status = %s", (email, senha, status))
  user = cursor.fetchone()
  cursor.close()
  conexao.close()
  return user