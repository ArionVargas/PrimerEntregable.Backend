import nodemailer from 'nodemailer'
import config from '../config/configServer.js'
import __dirname from '../../utils.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailPassword
    }
})

transporter.verify(function (error, success) {
    if (error) {
        console.log(error)
    } else {
        console.log('Server is ready to take our messages')
    }
})

const mailOptions = {
    from: "Test " + config.gmailAccount,
    to: config.gmailAccount,
    subject: "Pedido realizado",
    html: `<div>
        <h2>Gracias por su compra su pedido es el numero </h2>
        <p>Su ticket</p>
        <img src='cid:auto1'/>
    </div>`,
    attachments: [{
        filename: 'auto',
        path: 'https://firebasestorage.googleapis.com/v0/b/ventacars-9cb7d.appspot.com/o/ford-focus-2023.png?alt=media&token=47fae564-3373-4ce3-9130-7c2073363f80',
        cid: 'auto1'
    }]
}

export const sendEmail = (req, res) => {
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.status(400).send({ massage: 'Error', payload: error })
            }
            console.log('Massage send:%s', info.messageId)
            res.send({ massage: 'Success', payload: info })
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({ error: error, massage: 'No se pudo enviar email de email.controller' })
    }
}