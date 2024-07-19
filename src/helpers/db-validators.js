import User from '../users/user.model.js'

export const existeEmail = async (email = '') => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado`)
    }
}

export const existeUsuarioById = async (id = '') =>{
    const existeUsuario = await User.findById(id)
    if(!existeUsuario){
        throw new Error(` el ID: ${id} no existe` )
    }
}

