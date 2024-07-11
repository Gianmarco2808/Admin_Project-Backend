import { body, param } from "express-validator";


export const validationsProjectId = [
   param('projectId').isMongoId().withMessage('ID no válido'),
]

export const validationsId = [
   param('id').isMongoId().withMessage('ID no válido'),
]

export const projectValidations = [
     body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
     body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
     body('description').notEmpty().withMessage('La descripcion es obligatorio'),
]

export const noteValidator = [
   body('content').notEmpty().withMessage('El contenido es obligatorio')
]

export const noteIdValidator = [
   param('noteId').isMongoId().withMessage('ID no válido')
]