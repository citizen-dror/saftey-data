const express = require('express')
const path = require('path')
const bodyParser = require ('body-parser')
const PORT = process.env.PORT || 5000
const app = express()

var db = require('./src/database');

const usersRoute = require('./src/routes/users')
const hazardRoue = require('./src/routes/hazards')
const accidentRoute = require('./src/routes/accident')
const cityRoute  = require('./src/routes/city')
const imgRoute  = require('./src/routes/images')

app.use(bodyParser.json())
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})
//get react static files
app.use(express.static(path.join(__dirname, 'build')))
app.use('/api/v1/users',usersRoute)
app.use('/api/v1/hazards',hazardRoue)
app.use('/api/v1/accident',accidentRoute)
app.use('/api/v1/city', cityRoute)
app.use('/api/v1/img', imgRoute)
//if not find - navigate in react
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

app.use((req, res, next) => {
    res.status(404).send("The url you requested cannot be found.")
})
app.use((err, req, res, next) => {
    console.error(err.stack)
})
app.listen(PORT, () => console.info('Server has started on ' + PORT))
