const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express()
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

//TEST
app.get('/', (req, res) => {

    res.json({
        ok: true,
        message: 'Hola Mundo'
    })
})



//GET Users
app.get('/usuarios', (req, res) => {

    let from = Number(req.query.from || 0);
    let limit = Number(req.query.limit || 5);

    Usuario.find({})
        .skip(from)
        .limit(limit)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                usuarios
            })

        })
    //res.json('GET usuario')
})


//GET User
app.get('/usuario/:id', (req, res) => {
    let id = req.params.id

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuario
        })
    })
})

//POST
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
        estado: body.estado,
        google: body.google

    })



    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

//PUT
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })
})

//DELETE
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err : "Usuario no existe"
            })
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
})

module.exports = app;