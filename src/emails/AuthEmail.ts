import { Resend } from "resend"
import dotenv from 'dotenv'
dotenv.config()

interface IEmail {
     email: string
     name: string,
     token: string
}

const resend = new Resend(process.env.API_EMAIL)

export class AuthEmail {

     static sendConfirmationEmail = async ( user : IEmail  ) => {
          const {data, error} = await resend.emails.send({
               from: process.env.EMAIL_FROM,
               to: [user.email],
               subject: 'confirma tu cuenta',
               html: `<p>Hola: ${user.name}, has creado tu cuenta en Poject Admin, debes confirmar tu cuenta</p>
                    <p>Visita el siguiente enlace: </p>
                    <div class='text-center'>
                         <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                    </div>
                    <p>ingresa el código: <b>${user.token}</b></p>
                    <p>Este token expira en 10 minutos</p>`
          })
          if (error) {
               return console.error({error})
          }
          console.log('Mensaje enviado');     
     }

     static sendPasswordResetToken = async ( user : IEmail  ) => {
          const {data, error} = await resend.emails.send({
               from: process.env.EMAIL_FROM,
               to: [user.email],
               subject: 'Reestable tu password',
               html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password.</p>
                    <p>Visita el siguiente enlace: </p>
                    <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer password</a>
                    <p>E ingresa el código: <b>${user.token}</b></p>
                    <p>Este token expira en 10 minutos</p>`
          })
          if (error) {
               return console.error({error})
          }
          console.log('Mensaje enviado');
     }

}