const express = require('express');
const app = express()
const Usuario = require('../models/usuario');



//GET
app.get('/usuarios', (req, res) => {
    res.json('GET usuario')
})

//POST
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre : body.nombre,
        email : body.email,
        password : body.password,
        img : body.img,
        role : body.role,
        estado : body.estado,
        google : body.google

    })

    usuario.save((err, usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario : usuarioDB
        })
    })
})

//PUT
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json(`Update usuario ${id}`)
})

//DELETE
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id
    res.json(`Delete usuario ${id}`)
})

module.exports = app;