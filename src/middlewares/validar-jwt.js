'use strict'
import User from '../users/user.model.js'
import jwt from 'jsonwebtoken'


export const validarJWT = async (req, res, next) => {
    try{
        // Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        // Obtener el token de los headers
        let { authorization } = req.headers
        // Verificar si viene el token 
        if(!authorization) return res.status(401).send({message: 'Unhautorized'})
        // Obtener el id del usuario que envió el token 
        let { uid } = jwt.verify(authorization, secretKey)
        // Validar si aún existe en la DB 
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'User not found - Unhautorized'})
        req.user = user
        next()     
    }catch(err){
        console.error(err)
        return res.status(401).send({meesage: 'Invalid token'})
    }
}

export const isOneSelf = async(req, res, next) =>{
    let { user } = req 
    let { id } = req.params
    let useR = await User.findOne({_id: id})
    if(user.id !== useR.id) return res.status(403).send({message: `You dont have access | username: ${user.username}`})
    else next()
}