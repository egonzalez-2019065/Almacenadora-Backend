import {Schema, model} from "mongoose"
import { version } from "os"

const taskSchema = Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    state: {
        type: String,
        uppercase: true,
        enum: ['PENDIENTE', 'TERMINADA'],
        default: 'PENDIENTE'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},{
    versionKey: false
})

export default model('task', taskSchema)