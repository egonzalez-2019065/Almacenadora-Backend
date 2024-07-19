import { Router } from 'express'
import { 
    deleteTask, 
    getTasks, 
    save, 
    test, 
    update 
} from './task.controller.js'
import { validarJWT } from '../middlewares/validar-jwt.js'


const api = Router()

// Rutas públicas
api.post('/test', test)
// Rutas privadas
api.post('/save',[validarJWT], save)
api.put('/update/:id', [validarJWT], update)
api.delete('/deleteTask/:id', [validarJWT], deleteTask)
api.get('/getTasks', [validarJWT], getTasks)

export default api 