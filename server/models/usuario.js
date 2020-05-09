const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//const { Schema } = require("mongoose");

let usuarioSchema = new Schema({
    nombre :{
        type : String,
        required : [true, 'El nnombre es requerido']
    },
    email :{
        type : String,
        required : [true, 'El correo es requerido']
    },
    password :{
        type : String,
        required : [true, 'El password es requerido']
    },
    img :{
        type : String,
        required : false
    },
    role :{
        type : String,
        default : 'USER_ROLE'
    },
    estado :{
        type : Boolean,
        default : true
    },
    google :{
        type : Boolean,
        default : false
    }

})

module.exports = mongoose.model('Usuario', usuarioSchema);