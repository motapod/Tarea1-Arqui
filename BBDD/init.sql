CREATE DATABASE IF NOT EXISTS biblioteca;

USE biblioteca;

CREATE TABLE IF NOT EXISTS Libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    cantidad_hojas INT NOT NULL,
    fecha_emision DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_libro INT NOT NULL,
    comentario TEXT NOT NULL,
    puntuacion FLOAT NOT NULL,
    FOREIGN KEY (id_libro) REFERENCES Libros(id)
);

CREATE DATABASE IF NOT EXISTS biblioteca;

USE biblioteca;

CREATE TABLE IF NOT EXISTS Libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    cantidad_hojas INT NOT NULL,
    fecha_emision DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_libro INT NOT NULL,
    comentario TEXT NOT NULL,
    puntuacion FLOAT NOT NULL,
    FOREIGN KEY (id_libro) REFERENCES Libros(id)
);

-- Insertar libros por defecto
INSERT INTO Libros (nombre, tipo, autor, cantidad_hojas, fecha_emision) VALUES
('El Quijote', 'Novela', 'Miguel de Cervantes', 863, '1605-01-16'),
'1984', 'Distopía', 'George Orwell', 328, '1949-06-08'),
('Cien años de soledad', 'Novela', 'Gabriel García Márquez', 417, '1967-05-30');

-- Insertar reseñas por defecto
INSERT INTO Resenas (id_libro, comentario, puntuacion) VALUES
(1, 'Una obra maestra de la literatura española.', 4.8),
(1, 'Un libro largo pero fascinante.', 4.5),
(2, 'Un retrato inquietante de un futuro totalitario.', 4.9),
(2, 'Muy interesante y revelador.', 4.7);
