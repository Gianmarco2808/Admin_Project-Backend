import { Router } from "express"
import { AuthController } from "../controllers/AuthController"
import { checkPassword, validationEmail, validationLogin, validationProfile, validationResetPassword, validationsUsers, validationTokens, validationUpdatePassword } from "../validators/authValidations"
import { handleInputErrors } from "../middleware/validation"
import { authenticate } from "../middleware/auth"

const router = Router()

router.post('/create-account', 
     validationsUsers,
     handleInputErrors,
     AuthController.createAccount
)

router.post('/confirm-account',
     validationTokens,
     handleInputErrors,
     AuthController.confirmAccount
)

router.post('/login',
     validationLogin,
     handleInputErrors,
     AuthController.login
)

router.post('/request-code',
     validationEmail,
     handleInputErrors,
     AuthController.requestConfirmationCode
)

router.post('/forgot-password',
     validationEmail,
     handleInputErrors,
     AuthController.forgotPassword
)

router.post('/validate-token', 
     validationTokens,
     handleInputErrors,
     AuthController.validateToken
)

router.post('/update-password/:token', 
     validationResetPassword,
     handleInputErrors,
     AuthController.updatePasswordWithToken
)

router.get('/user',
     authenticate,
     AuthController.user
)

/** Profile */
router.put('/profile',
     authenticate,
     validationProfile,
     handleInputErrors,
     AuthController.uptadeProfile
)

router.post('/update-password',
     authenticate,
     validationUpdatePassword,
     handleInputErrors,
     AuthController.uptadeCurrentUserPassword
)

router.post('/check-password', 
     authenticate,
     checkPassword,
     handleInputErrors,
     AuthController.checkPassword
)


export default router