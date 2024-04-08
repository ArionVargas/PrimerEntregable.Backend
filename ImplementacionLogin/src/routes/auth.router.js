import express from 'express'
import userModel from '../models/users.model.js'

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const exists = await userModel.findOne({ email })
    if (exists) {
        return res.redirect('/login')
    }
    const user = {
        firstName,
        lastName,
        email,
        password
    }
    const result = await userModel.create(user)
    return res.redirect('/login')
})

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
       
        const user = await userModel.findOne({ email, password })

        if (!user) {
            return res.status(401).send({ status: "false", error: "Incorrect credentials" })
        }

        req.session.user = {
            firstName: `${user.firstName}`,
            email: user.email
        }
        

        res.status(200).json({ status: "success", user: req.session.user })
    } catch (error) {
        console.error('Error al iniciar sesión', error)
        res.status(500).json({ status: "false", message: 'Error interno del servidor' })
    }
})

authRouter.post('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ error: 'error logout', message: 'error al cerrar sesión' })
        } else {
            res.redirect('/login'); // Redirige a la página de login después de cerrar sesión
        }
    })
})

export default authRouter
