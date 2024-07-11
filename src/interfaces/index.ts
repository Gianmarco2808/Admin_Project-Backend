import { Document, PopulatedDoc, Types } from "mongoose"


export interface IProject extends Document {
     projectName: string
     clientName: string
     description: string
     tasks: PopulatedDoc<ITask & Document>[] //multiples tareas
     manager: PopulatedDoc<IUser & Document> //Un manager por proyecto
     team: PopulatedDoc<IUser & Document>[] //pueden ser diferentes
}


export interface ITask extends Document {
     name: string
     description: string
     project: Types.ObjectId
     status: TaskStatus
     completedBy: {
          user: Types.ObjectId,
          status: TaskStatus
     }[]
     notes: Types.ObjectId[]
}

export interface INote extends Document {
     content: string,
     createdBy: Types.ObjectId,
     task: Types.ObjectId
}

export interface IUser extends Document {
     email: string,
     password: string,
     name: string,
     confirmed: boolean
}

export interface IToken extends Document {
     token: string,
     user: Types.ObjectId,
     createdAt: Date
}

export const taskStatus = {
     PENDING: 'pending',
     ON_HOLD: 'onHold',
     IN_PROGRESS: 'inProgress',
     UNDER_REVIEW: 'underReview',
     COMPLETED: 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]