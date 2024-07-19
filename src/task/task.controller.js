'use strict'
import taskModel from './task.model.js'
import Task from './task.model.js'

export const test = (req, res) => {
    console.log('test is running')
    res.send({message: 'test taskt is running'})
}


export const save = async(req, res) => {
    try{
        // Traer al usuario
        const userID = req.user.id
        console.log(req.user)
        // Traer los datos 
        let data = req.body
        data.user = userID
        data.startDate = new Date()
        // Asignar los valores
        let task = new Task(data)
        // Guardar
        await task.save()
        // Responder al usuario
        return res.send({message: 'Task saved successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving a task'})
    }
}

export const update = async(req, res) => {
    try{
        // Traer al usuario 
        const userID = req.user.id
        // Traer a la tarea a actualizar
        const { id } = req.params
        // Traer los datos a actualizar 
        let  data  = req.body
        // buscar que exista la tarea
        let taskExist = await Task.findOne({_id: id, user: userID})
        if(!taskExist) return res.status(404).send({message: 'Error task not exist or not found'})
 
        // Verificar la fecha en la que se terminó 
        if(data.state == 'TERMINADA'){
            data.endDate = new Date() 
        } 
        let task = await Task.findOneAndUpdate(
            {_id: id, user: userID},
            data,
            {new: true}
        ).populate('user', ['name', 'surname', 'username'])
        return res.send({message: 'Task updated successfully', task})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating a task'})
    }
}

export const deleteTask = async(req, res)=>{
    try {
        // Traer al usuario 
        const userID = req.user.id
        // Traer a la tarea a actualizar
        const { id } = req.params
        // buscar que exista la tarea
        let taskExist = await Task.findOne({_id: id, user: userID})
        if(!taskExist) return res.status(404).send({message: 'Error task not exist or not found'})
        // Eliminar la tarea
        let task = await Task.findOneAndDelete({_id: id, user: userID})
        // Responder al usuario
        return res.send({message: 'Task deleted successfully', task})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting task'})
    }
}

export const getTasks = async(req, res)=>{
    try {
        const userID = req.user.id
        let tasks = await Task.find({user: userID}).populate('user', ['name', 'surname', 'username'])
        return res.send(tasks)
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting tasks'})
    }
}
