import config from '../config/configServer.js'
import twilio from 'twilio'

const twilioClient = twilio(config.twilioAccountSID, config.twilioAuthToken)
const twilioOptions = {
    body: 'Gracias por su compra',
    from: config.twilioSMSNUmber,
    to: config.twilioWhatsappNumber 
}

export const sendSMS = async (req, res) => {
    try {
        console.log('SMS desde twilio')
        const result = await twilioClient.messages.create(twilioOptions)

        res.send({ message: 'Success', payload: result })
    } catch (error) {
        console.log('hubo un problema con twilio')
        res.status(500).send({ error: error })
    }
}