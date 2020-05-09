require ('../server/config/config')
const express = require('express')
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//GET
app.get('/alumnos', (req, res) => {
    res.json('GET Alumnos')
})

//POST
app.post('/alumno', (req, res) => {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: 'El nombre es requerido'
        })
    }
    else {
        res.json({ body })

    }

})

//PUT
app.put('/alumno/:id', (req, res) => {
    let id = req.params.id;
    res.json(`Update alumno ${id}`)
})

//DELETE
app.delete('/alumno/:id', (req, res) => {
    let id = req.params.id
    res.json(`Delete alumno ${id}`)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))