import User from "../users/user.model.js";
import { generarJWT } from "../helpers/generate-JWT.js";
import { encrypt, checkPassword, checkUpdate } from '../middlewares/validar-campos.js'




export const register = async (req, res) => {
  try {
      //Capturar el formulario (body)
      let data = req.body

      //Encriptar la contraseña
      data.password = await encrypt(data.password)


      //Guardar la información en la DB
      let user = new User(data)
      let registerUser = {
        uid: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }
    let token = await generarJWT(registerUser)
      await user.save() //Gardar en la DB

      //Responder al usuario
      return res.send({ message: `Registered admin successfully, can be logged with username ${user.username}`, token})
  } catch (err) {
      console.error(err)
      return res.status(500).send({ message: 'Error registering user', err: err })
  }
}

export const login = async (req, res) => {
  try {
      // Capturar los datos (body)
      let data = req.body

      // Buscar usuario por nombre de usuario y correo electrónico
      let login = await User.findOne({
          $or: [
              {
                  username: data.user
              },
              {
                  email: data.user
              }
          ]
      })
      console.log(login)

      // Verificar si el usuario no existe
      if (!login) return res.status(404).send({ message: 'error validate username or email' })

      // Verificar la contraseña
      if (await checkPassword(data.password, login.password)) {
          let loggedUser = {
              uid: login._id,
              email: login.email,
              name: login.name
          }
          // Generar el token 
          let token = await generarJWT(loggedUser)
          return res.send({ message: `Welcome ${loggedUser.name}`, loggedUser, token })
      } else {
          return res.status(401).send({ message: 'Invalid password' })
      }
  } catch (error) {
      console.error(error)
      return res.status(500).send({ message: 'Error login user', error: error })
  }
}

// Admin por defecto
const defaultAdmin = {
  name: 'Josué',
  surname: 'Noj',
  username: 'jnoj',
  password: 'jnoj123',
  email: 'jnoj@gmail.com',
}

// Inserción de datos 
export const insertDefaultAdmin = async(req, res) =>{
  try{
      //Un único teacher por defecto
      const onceTeacher = await User.findOne({username: defaultAdmin.username})
      if(onceTeacher){
          console.log('This admin alread exists')
      }else{
          //Encryptar la contraseña
          defaultAdmin.password = await encrypt(defaultAdmin.password)
          //Crear el nuevo teacher
          const newAdmin = await User.create(defaultAdmin)
          //Responder al usuario
          console.log('A deafult admin is create')
      }
  }catch(err){
      console.error(err)
      return res.status(500).send({message: 'Error registering user'})
  }
}

