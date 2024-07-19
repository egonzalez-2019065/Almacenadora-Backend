import { validationResult } from "express-validator";
import { hash, compare } from 'bcrypt'

export  const validarCampos = (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json(error)
    }
    next()
}
export const encrypt = (password) => {
    try {
        return hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkPassword = async (password, hash) => {
    try{
        return await compare(password, hash)
    }catch(err){
        console.error(err);
        return err
    }
}

export const checkUpdate = (data, token)=>{
    if(token.role === 'CLIENT'){
        if(Object.entries(data).length === 0 ||
            data.role ||
            data.role == '' ||
            data.password ||
            data.password == ''
        ) {
            return false
        }
        return true
    }else{
        if(Object.entries(data).length === 0 ||
            data.password ||
            data.password == ''
        ){
            return false
        }
        return true
    }
}      