import { body, param } from "express-validator";

export const validationsTaskId = [
     param('taskId').isMongoId().withMessage('ID no válido'),
  ]

export const taskValidations = [
     body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
     body('description').notEmpty().withMessage('La descripcion es obligatorio'),
]

export const statusValidation = [
     body('status').notEmpty().withMessage('El estado es obligatorio')
]