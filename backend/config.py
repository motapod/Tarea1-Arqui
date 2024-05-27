import os
import pymysql
# Definir las variables de entorno utilizando los valores de Docker
MYSQL_HOST = os.environ.get('MYSQL_HOST', 'localhost')
MYSQL_USER = os.environ.get('MYSQL_USER', 'myuser')
MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'mypassword')
MYSQL_DATABASE = os.environ.get('MYSQL_DATABASE', 'biblioteca')

# Crear una conexión a MySQL utilizando las variables de entorno
def conectar_db():

    db = pymysql.connect(host=MYSQL_HOST, user=MYSQL_USER, password=MYSQL_PASSWORD, database=MYSQL_DATABASE)
    return db