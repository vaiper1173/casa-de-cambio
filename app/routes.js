// Import modules
const { randomInt } = require('crypto');
const express = require('express');
const path = require('path');

// Create a router object
const router = express.Router();

// Export our router
module.exports = router;

///////////////////////
//---- ROUTES TO ----//
///////////////////////

//Función que contiene Variables Globales
var compra = 19.85;
var venta = 20.05;
var iniciodolar = 2500;
var iniciopesos = 20000;
var dolaresC = 0;
var dolaresV = 0;
var totalC = 0;
var totalV = 0;
var totaldolaresC = 0;
var totaldolaresV = 0;
var residuo = 0;
var pagocliente = 0;
var fondoinsuficiente = 'Error: Fondos Insuficientes';
var faltapago = 'Error: El pago no es suficiente o fué erróneo';

//Route to HOME
router.get('/', function(req, res){
    res.render('pages/home', {compra, venta, iniciodolar, iniciopesos});
});

//Router to Compra
router.get('/compra', function(req, res){
    res.render('pages/compra', {compra, venta, iniciodolar, iniciopesos, dolaresC, totalC, residuo, pagocliente});
});

//POST Compra
router.post('/compra', function(req, res){
    if(iniciopesos > (Number(req.body.dolar) * compra)) {
        pagocliente = req.body.pago;
        iniciodolar = Number(req.body.dolar) + iniciodolar;
        iniciopesos = iniciopesos - (Number(req.body.dolar) * compra);
        dolaresC = Number(req.body.dolar);
        totalC = Number(req.body.dolar) * compra;   
        totaldolaresC = totaldolaresC + Number(req.body.dolar);
        residuo = Number(req.body.pago) - Number(req.body.dolar);
        res.render('pages/compra', {compra, venta, iniciodolar, iniciopesos, dolaresC, totalC, residuo, pagocliente});
    }
    else {
        res.render('pages/error', {fondoinsuficiente});
    }  
});

//Router to Venta
router.get('/venta', function(req, res){
    res.render('pages/venta', {compra, venta, iniciodolar, iniciopesos, dolaresV, totalV, residuo, pagocliente});
});

//POST Venta
router.post('/venta', function(req, res){
    if(iniciodolar > Number(req.body.dolar)) {
        pagocliente = req.body.pago;
        iniciodolar = iniciodolar - Number(req.body.dolar);
        iniciopesos = iniciopesos + (Number(req.body.dolar) * venta);
        dolaresV = Number(req.body.dolar);
        totalV = Number(req.body.dolar) * venta;  
        totaldolaresV = totaldolaresV + Number(req.body.dolar); 
        residuo = Number(req.body.pago) - (Number(req.body.dolar)*venta);
        if(residuo > 0){
            res.render('pages/venta', {compra, venta, iniciodolar, iniciopesos, dolaresV, totalV, residuo, pagocliente});
        }
        else {
            res.render('pages/errorfaltapago', {faltapago});
        }
    }
    else {
        res.render('pages/errorfondos', {fondoinsuficiente});
    }
});

//Route to Reporte
router.get('/reporte', function(req, res){
    res.render('pages/reporte', {totaldolaresC, totaldolaresV});
});
