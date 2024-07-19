'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'
import authRoutes from '../src/auth/auth.routes.js'
import taskRoutes from '../src/task/task.routes.js'
import { dbConnection } from './mongo.js'

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.authPath = '/almacenadora/v1/auth'
        this.taskPath = '/almacenadora/v1/task'

        this.middlewares()
        this.conectarDB()
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
        this.app.use(apiLimiter)
    }

    routes(){
        this.app.use(this.authPath , authRoutes);
        this.app.use(this.taskPath, taskRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server