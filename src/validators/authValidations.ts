import { body, param } from "express-validator";

export const validationsUsers = [
     body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
     body('password').isLength({min: 8}).withMessage('El password es muy corto, mínimo 8 caracteres'),
     body('password_confirmation').custom((value, {req}) => {
         if (value !== req.body.password) {
            throw new Error('Los password no son iguales')
         }
         return true
     }),
     body('email').isEmail().withMessage('E-mail no válido'),
  ]

export const validationTokens = [
   body('token').notEmpty().withMessage('El token no puede ir vacio')
]  

export const validationLogin = [
   body('email').isEmail().withMessage('E-mail no válido'),
   body('password').notEmpty().withMessage('El password no puede ir vacío')
]

export const validationEmail = [
   body('email').isEmail().withMessage('E-mail no válido')
]

export const validationResetPassword = [
   param('token').isNumeric().withMessage('Token no válido'),
   body('password').isLength({min: 8}).withMessage('El password es muy corto, mínimo 8 caracteres'),
     body('password_confirmation').custom((value, {req}) => {
         if (value !== req.body.password) {
            throw new Error('Los password no son iguales')
         }
         return true
     }),
]

export const validEmailTeam = [
   body('email').isEmail().toLowerCase().withMessage('E-mail no válido')
]

export const validationIdTeam = [
   body('id').isMongoId().withMessage('ID no válido')
]

export const validationTeam = [
   param('userId').isMongoId().withMessage('ID no válido')
]

export const validationProfile = [
   body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
   body('email').isEmail().withMessage('E-mail no válido')
]

export const validationUpdatePassword = [
   body('current_password').notEmpty().withMessage('El password actual no puede ir vacío'),
   body('password').isLength({min: 8}).withMessage('El password es muy corto, mínimo 8 caracteres'),
     body('password_confirmation').custom((value, {req}) => {
         if (value !== req.body.password) {
            throw new Error('Los password no son iguales')
         }
         return true
     }),
]

export const checkPassword = [
   body('password').notEmpty().withMessage('El password no puede ir vacío')
]