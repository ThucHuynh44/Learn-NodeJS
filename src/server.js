const express = require('express')
const path = require('path')
require('dotenv').config()
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const connection = require('./config/database')

const app = express() //app express
const port = process.env.PORT || 8080
const hostname = process.env.HOSTNAME

// Config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//config template engine
configViewEngine(app)

//Khai báo route
app.use('/',webRoutes)


//Test connections

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})
