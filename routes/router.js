const express = require('express')
const router = express.Router()


const alumnController = require('../controllers/alumnController')
const { Router } = require('express')


//path to send the data in json format
const { json } = require('express');

//Invoke the JR connection
const conexion = require('../config/conexion')

//Se importa la biblioteca moment.js para formatear las fechas:
const moment = require('moment');

router.post('/index', alumnController.resultData)
router.get('/', (req, res) => {//authController.isAuthenticated, (req, res) => {
    res.render('index', { titleWeb: "Formulario Búsqueda de alumnos"})//userName: row.name, image: row.image, titleWeb: "Formulario Búsqueda de alumnos"})
})

module.exports = router;