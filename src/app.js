const express=require('express')
const bodyParser=require('body-parser')
const taskRoutes=require('./routes/taskRoutes')
const errorHandler=require('./middleware/errorHandler')
const { default: helmet}= require("helmet")
const dotenv=require('dotenv')

dotenv.config()
const app=express()
const PORT=3000
app.use(helmet())
app.use(bodyParser.json())
app.use('/task',taskRoutes)
app.use(errorHandler)//controlador de errores
app.listen(PORT,()=>{
    console.log(`Servidor activo en el puerto ${PORT}`)
})