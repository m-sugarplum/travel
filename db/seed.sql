CREATE DATABASE mexico;

USE mexico;

CREATE TABLE states (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    state_name VARCHAR(100) NOT NULL UNIQUE,
    official_name VARCHAR(100),
    capital VARCHAR(100),
    largest_city VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE places (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    place_name VARCHAR(255) NOT NULL UNIQUE,
    city VARCHAR(255) NOT NULL,
    state_id INT NOT NULL,
    place_description TEXT,
    img VARCHAR(255),
    img_wide VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW();
    FOREIGN KEY(state_id) REFERENCES states(id) ON DELETE CASCADE
);

INSERT INTO states(state_name, official_name, capital, largest_city) VALUES 
("Aguascalientes", "Aguascalientes", "Aguascalientes", "Aguascalientes"),
("Baja California", "Baja California", "Mexicali", "Tijuana"),
("Baja California Sur", "Baja California Sur", "La Paz", "La Paz"),
("Campeche", "Campeche", "San Francisco de Campeche", "San Francisco de Campeche"),
("Chiapas", "Chiapas", "Tuxtla Gutiérrez", "Tuxtla Gutiérrez"),
("Chihuahua", "Chihuahua", "Chihuahua", "Ciudad Juárez"),
("Coahuila", "Coahuila de Zaragoza", "Saltillo", "Saltillo"),
("Colima", "Colima", "Colima", "Manzanillo"),
("Durango", "Durango", "Victoria de Durango", "Victoria de Durango"),
("Guanajuato", "Guanajuato", "Guanajuato", "León de los Aldama"),
("Guerrero", "Guerrero", "Chilpancingo de los Bravo", "Acapulco de Juárez"),
("Hidalgo", "Hidalgo", "Pachuca de Soto", "Pachuca de Soto"),
("Jalisco", "Jalisco", "Guadalajara", "Guadalajara"),
("México", "México", "Toluca de Lerdo", "Ecatepec de Morelos"),
("Mexico City", "Ciudad de México", "Mexico City"),
("Michoacán", "Michoacán de Ocampo", "Morelia", "Morelia"),
("Morelos", "Morelos", "Cuernavaca", "Cuernavaca"),
("Nayarit", "Nayarit", "Tepic", "Tepic"),
("Nuevo León", "Nuevo León", "Monterrey"),
("Oaxaca", "Oaxaca", "Oaxaca de Juárez"),
("Puebla", "Puebla", "Puebla de Zaragoza", "Puebla de Zaragoza"),
("Querétaro", "Querétaro de Arteaga", "Santiago de Querétaro"),
("Quintana Roo", "Quintana Roo", "Chetumal", "Cancún"),
("San Luis Potosí", "San Luis Potosí", "San Luis Potosí", "San Luis Potosí"),
("Sinaloa", "Sinaloa", "Culiacán Rosales", "Culiacán Rosales"),
("Sonora", "Sonora", "Hermosillo", "Hermosillo"),
("Tabasco", "Tabasco", "Villahermosa", "Villahermosa"),
("Tamaulipas", "Tamaulipas", "Ciudad Victoria", "Reynosa"),
("Tlaxcala", "Tlaxcala", "Tlaxcala de Xicohténcatl", "San Pablo del Monte"),
("Veracruz", "Veracruz de Ignacio de la Llave", "Xalapa-Enríquez", "Veracruz"),
("Yucatán", "Yucatán", "Mérida", "Mérida"),
("Zacatecas", "Zacatecas", "Zacatecas", "Guadalupe");

-- INSERT INTO places (place_name, city, state_id, place_description, img, img_wide)










