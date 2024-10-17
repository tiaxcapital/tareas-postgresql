const express=require('express')
const router=express.Router()
const taskController=require("../controllers/taskController")
const { body,param,validationResult }=require("express-validator")
//parametros para validar cuerpo
const validateBodyTask=[
    body("title")
    .isLength({ min:1 }).withMessage("title es requerido")
    .isString().withMessage("title es un string")
    .trim()
    .escape(),//evitar inyeccion de SQL    
    body("descripcion")
    .optional()
    .isString().withMessage("descripcion es un string")
    .trim().escape()
]
//parametros para validar id
const validateTaskId= [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("El id de la tarea tiene que ser mayor que 0 y valor positivo")
      .toInt(),
  ]
//todas las tareas
router.get("/",taskController.getTasks)
//Tarea por id
router.get("/:id",validateTaskId,taskController.getTasksById)
//crear nueva tarea
router.post("/",validateBodyTask,taskController.createTask)
//actualizar tarea
router.put("/:id",validateTaskId.concat(validateBodyTask),taskController.updateTask)
//eliminar tarea
router.delete("/:id",validateTaskId,taskController.deleteTask)

module.exports=router