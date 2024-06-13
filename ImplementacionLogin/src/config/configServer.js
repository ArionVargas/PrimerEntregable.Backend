import dotenv from 'dotenv'
import program from '../process.js'



const environment = program.opts().mode

/* dotenv.config() */

/* console.log(process.env.SERVER_PORT)
console.log(process.env.ADMIN) */



dotenv.config({
    path: environment === 'production' ? './src/config/.env.production' : './src/config/.env.development'
})

export default {
    port: process.env.SERVER_PORT,
    mongoURL: process.env.MONGO_URL,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailPassword: process.env.GMAIL_APP_PASSW,
    twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioSMSNUmber: process.env.TWILIO_SMS_NUMBER,
    twilioWhatsappNumber: process.env.TWILIO_TO_SMS_NUMBER
}
