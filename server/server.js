require ('../server/config/config')

const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./controllers/usuario'))



mongoose.connect('mongodb://localhost:27017/activos',(err, res)=>{
    if(err){
        throw err;
    }
    else {
        console.log("DB Connected");
    }
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))