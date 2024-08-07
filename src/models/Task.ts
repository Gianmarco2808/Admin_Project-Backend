import mongoose, { Schema, Types } from "mongoose";
import { ITask, taskStatus } from "../interfaces";
import Note from "./Note";

export const TaskSchema : Schema = new Schema({
     name: {
          type: String,
          trim: true,
          required: true
     },
     description: {
          type: String,
          trim: true,
          required: true
     },
     project: {
          type: Types.ObjectId,
          ref: 'Project'
     },
     status: {
          type: String,
          enum: Object.values(taskStatus),
          default: taskStatus.PENDING
     },
     completedBy: [
          {
               user: {
                    type: Types.ObjectId,
                    ref: 'User',
                    default: null
               },
               status: {
                    type: String,
                    enum: Object.values(taskStatus),
                    default: taskStatus.PENDING
               }
          }
     ],
     notes: [
          {
               type: Types.ObjectId,
               ref: 'Note'
          }
     ]
}, {timestamps: true})

// Middleware
TaskSchema.pre('deleteOne', {document: true, query: false}, async function() {
     const taskId = this._id
     if(!taskId) return
     await Note.deleteMany({task: taskId})
})


const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task