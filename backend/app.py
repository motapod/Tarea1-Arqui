from flask import Flask, jsonify, request
from config import conectar_db

app = Flask(__name__)

# Conectar a la base de datos usando la función de config.py
db = conectar_db()
cursor = db.cursor()

# Rutas para la API
# Ruta para obtener todas las reseñas y sus libros asociados
@app.route('/libros', methods=['GET'])
def obtener_libros_con_resenas():
    # Consultar todos los libros
    cursor.execute("SELECT id, nombre, tipo, autor, cantidad_hojas, fecha_emision FROM Libros")
    libros = cursor.fetchall()

    # Convertir los libros a formato JSON
    libros_json = []
    for libro in libros:
        libro_json = {
            "id": libro[0],
            "nombre": libro[1],
            "tipo": libro[2],
            "autor": libro[3],
            "cantidad_hojas": libro[4],
            "fecha_emision": libro[5],
            "resenas": []  # Inicializar lista para las reseñas del libro
        }

        # Consultar las reseñas del libro actual
        cursor.execute("SELECT id, comentario, puntuacion FROM Resenas WHERE id_libro = %s", (libro[0],))
        resenas_libro = cursor.fetchall()

        # Convertir las reseñas a formato JSON y agregarlas a la lista del libro
        for resena in resenas_libro:
            resena_json = {
                "id": resena[0],
                "comentario": resena[1],
                "puntuacion": resena[2]
            }
            libro_json["resenas"].append(resena_json)

        libros_json.append(libro_json)

    # Retornar la respuesta JSON con todos los libros y sus reseñas
    return jsonify(libros_json), 200


@app.route('/libros/<int:libro_id>', methods=['GET'])
def obtener_libro_con_resenas(libro_id):
    # Validar si el libro existe
    cursor.execute("SELECT id FROM Libros WHERE id = %s", (libro_id,))
    if cursor.fetchone() is None:
        return jsonify({"mensaje": "El libro especificado no existe."}), 404

    # Consultar el libro y sus reseñas
    cursor.execute("SELECT id, nombre, tipo, autor, cantidad_hojas, fecha_emision FROM Libros WHERE id = %s", (libro_id,))
    libro = cursor.fetchone()

    if libro is None:
        return jsonify({"mensaje": "El libro especificado no existe."}), 404

    libro_json = {
        "id": libro[0],
        "nombre": libro[1],
        "tipo": libro[2],
        "autor": libro[3],
        "cantidad_hojas": libro[4],
        "fecha_emision": libro[5],
        "resenas": []  # Inicializar lista para las reseñas del libro
    }

    # Consultar las reseñas del libro actual
    cursor.execute("SELECT id, comentario, puntuacion FROM Resenas WHERE id_libro = %s", (libro_id,))
    resenas_libro = cursor.fetchall()

    # Convertir las reseñas a formato JSON y agregarlas a la lista del libro
    for resena in resenas_libro:
        resena_json = {
            "id": resena[0],
            "comentario": resena[1],
            "puntuacion": resena[2]
        }
        libro_json["resenas"].append(resena_json)

    # Retornar la respuesta JSON con el libro y sus reseñas
    return jsonify(libro_json), 200



# Ruta para agregar un nuevo libro
@app.route('/libros', methods=['POST'])
def agregar_libro():
    # Obtener los datos del libro del cuerpo de la solicitud
    datos_libro = request.get_json()

    if not datos_libro or "nombre" not in datos_libro or "tipo" not in datos_libro or "autor" not in datos_libro or "cantidad_hojas" not in datos_libro or "fecha_emision" not in datos_libro:
        return jsonify({"mensaje": "Se requieren todos los campos del libro."}), 400

    nombre = datos_libro["nombre"]
    tipo = datos_libro["tipo"]
    autor = datos_libro["autor"]
    cantidad_hojas = datos_libro["cantidad_hojas"]
    fecha_emision = datos_libro["fecha_emision"]

    # Consulta a la base de datos para insertar el nuevo libro
    cursor.execute("INSERT INTO Libros (nombre, tipo, autor, cantidad_hojas, fecha_emision) VALUES (%s, %s, %s, %s, %s)", (nombre, tipo, autor, cantidad_hojas, fecha_emision))
    db.commit()

    # Obtener el ID del libro recién creado
    cursor.execute("SELECT LAST_INSERT_ID()")
    libro_id = cursor.fetchone()[0]

    # Convertir el resultado a formato JSON
    libro_json = {
        "id": libro_id,
        "nombre": nombre,
        "tipo": tipo,
        "autor": autor,
        "cantidad_hojas": cantidad_hojas,
        "fecha_emision": fecha_emision
    }

    # Retornar la respuesta JSON
    return jsonify(libro_json), 201


# Ruta para actualizar un libro
@app.route('/libros/<int:libro_id>', methods=['PUT'])
def actualizar_libro(libro_id):
    # Obtener los datos del libro del cuerpo de la solicitud
    datos_libro = request.get_json()

    if not datos_libro or "nombre" not in datos_libro or "tipo" not in datos_libro or "autor" not in datos_libro or "cantidad_hojas" not in datos_libro or "fecha_emision" not in datos_libro:
        return jsonify({"mensaje": "Se requieren todos los campos del libro."}), 400

    nombre = datos_libro["nombre"]
    tipo = datos_libro["tipo"]
    autor = datos_libro["autor"]
    cantidad_hojas = datos_libro["cantidad_hojas"]
    fecha_emision = datos_libro["fecha_emision"]

    # Validar si el libro existe
    cursor.execute("SELECT id FROM Libros WHERE id = %s", (libro_id,))
    if cursor.fetchone() is None:
        return jsonify({"mensaje": "El libro especificado no existe."}), 404

    # Consulta para actualizar el libro
    cursor.execute("UPDATE Libros SET nombre = %s, tipo = %s, autor = %s, cantidad_hojas = %s, fecha_emision = %s WHERE id = %s", (nombre, tipo, autor, cantidad_hojas, fecha_emision, libro_id))
    db.commit()

    # Retornar la respuesta JSON con el mensaje de éxito
    return jsonify({"mensaje": "Libro actualizado exitosamente."}), 200


# DELETE para eliminar un libro

@app.route('/libros/<int:libro_id>', methods=['DELETE'])
def eliminar_libro(libro_id):
    # Validar si el libro existe
    cursor.execute("SELECT id FROM Libros WHERE id = %s", (libro_id,))
    if cursor.fetchone() is None:
        return jsonify({"mensaje": "El libro especificado no existe."}), 404

    # Eliminar las reseñas del libro
    cursor.execute("DELETE FROM Resenas WHERE id_libro = %s", (libro_id,))

    # Eliminar el libro
    cursor.execute("DELETE FROM Libros WHERE id = %s", (libro_id,))
    db.commit()

    # Retornar la respuesta JSON con el mensaje de éxito
    return jsonify({"mensaje": "Libro eliminado exitosamente."}), 200

# Ruta para agregar una nueva reseña
@app.route('/libros/<int:libro_id>/resenas', methods=['POST'])
def agregar_resena(libro_id):
    # Obtener los datos de la reseña del cuerpo de la solicitud
    datos_resena = request.get_json()

    if not datos_resena or "comentario" not in datos_resena or "puntuacion" not in datos_resena:
        return jsonify({"mensaje": "Se requieren los campos 'comentario' y 'puntuacion'."}), 400

    comentario = datos_resena["comentario"]
    puntuacion = datos_resena["puntuacion"]

    # Validar si el ID del libro existe
    cursor.execute("SELECT id FROM Libros WHERE id = %s", (libro_id,))
    if cursor.fetchone() is None:
        return jsonify({"mensaje": "El ID de libro especificado no existe."}), 400

    # Consulta a la base de datos para insertar la nueva reseña
    cursor.execute("INSERT INTO Resenas (id_libro, comentario, puntuacion) VALUES (%s, %s, %s)", (libro_id, comentario, puntuacion))
    db.commit()

    # Obtener el ID de la reseña recién creada
    cursor.execute("SELECT LAST_INSERT_ID()")
    resena_id = cursor.fetchone()[0]

    # Convertir el resultado a formato JSON
    resena_json = {
        "id": resena_id,
        "id_libro": libro_id,
        "comentario": comentario,
        "puntuacion": puntuacion
    }

    # Retornar la respuesta JSON
    return jsonify(resena_json), 201


# Ruta para obtener las reseñas de un libro
@app.route('/libros/<int:libro_id>/resenas', methods=['GET'])
def obtener_resenas(libro_id):
    # Consultar las reseñas del libro especificado
    cursor.execute("SELECT id, comentario, puntuacion FROM Resenas WHERE id_libro = %s", (libro_id,))
    resenas = cursor.fetchall()

    # Validar si existen reseñas para el libro
    if not resenas:
        return jsonify({"mensaje": "No se encontraron reseñas para el libro especificado."}), 404

    # Convertir las reseñas a formato JSON
    resenas_json = []
    for resena in resenas:
        resena_json = {
            "id": resena[0],
            "comentario": resena[1],
            "puntuacion": resena[2]
        }
        resenas_json.append(resena_json)

    # Retornar la respuesta JSON con las reseñas
    return jsonify(resenas_json), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500)
    print("El coso esta forwardeado al puerto 5500")

