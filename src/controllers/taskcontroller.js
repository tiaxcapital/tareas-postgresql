const taskModel=require("../models/taskModel")
const {validationResult} = require("express-validator")
//obtener todas las tareas
const getTasks=async (req,res,next)=>{
    try{
        const tasks=await taskModel.getTasks()
        res.json(tasks)
    }
    catch(error){
        // res.status(500).json({ error: error.message })
        next(error)
    }
}
//obtener tarea por id
const getTasksById=async (req,res,next)=>{
    const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
    try{
        const task= await taskModel.getTasksById(req.params.id)
        if(!task){
            return res.status(404).json({ error: "Tarea no encontrada"})
        }
        res.json(task)
    }
    catch(error){
        // res.status(500).json({ error: error.message })
        next(error)
    }
}

// crear una nueva tarea
const createTask=async (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()})
    }
    try{
        const newTask= await taskModel.createTask(req.body)
        res.status(201).json(newTask)
    }
    catch(error){
        // res.status(500).json({ error: error.message })
        next(error)
    }
}

//actualizar tarea 
const updateTask= async (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()})
    }
    try{
        const updateTask=await taskModel.updateTask(req.params.id,req.body)
        if(!updateTask){
            return res.status(404).json({ error: "Tarea no encontrada"})
        }
        res.json(updateTask)
    }
    catch(error){ 
        // res.status(500).json({ error: error.message })
        next(error)
    }
}
//eliminar tarea
const deleteTask=async (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()})
    }
    try{
        const deleteTask= await taskModel.deleteTask(req.params.id)
        if(!deleteTask){
            return res.status(404).json({ error:"Tarea no encontrada"})
        }
        res.json(deleteTask+" eliminado")
    }
    catch(error){
        // res.status(500).json({ error: error.message })
        next(error)
    }
}

module.exports={
    getTasks,getTasksById,createTask,updateTask,deleteTask
}