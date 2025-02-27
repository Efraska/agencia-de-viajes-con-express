// const express = require('express'); // version de commonJS
import express from 'express'; // version de ES6
import router from './routes/index.js'; // Importamos el archivo index.js de la carpeta routes
import db from './config/db.js'; // Importamos el archivo db.js de la carpeta config

// Crear el servidor
const app = express();

// Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error));

// Definir puerto
const port = process.env.port || 4000;

// Habilitar pug
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    return next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar el router
app.use('/', router);

// Definir la página principal
app.listen(port, () => {
    console.log(`EL servidor está funcionando en el puerto ${port}`);
})