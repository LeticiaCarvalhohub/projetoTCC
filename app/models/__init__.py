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