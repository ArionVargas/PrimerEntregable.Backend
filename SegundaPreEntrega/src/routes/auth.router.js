import express from 'express'
/* import { login,signup } from '../controllers/auth.controllers.js' */
import userModel from '../models/users.model.js'

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    console.log("Registrando Usuario");
    console.log(req.body);

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
    const { email, password } = req.body
    const user = await userModel.findOne({ email, password }) 
    if (!user) {
        return res.redirect('/login')
    }

    if (!password) {
        return res.redirect('/login')
    }

    req.session.user = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
    }

    res.redirect('/products')
})

authRouter.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect('/products',{
            user: req.session.user
        })
    } else {
        res.redirect('/login')
    }
}
)
export default authRouter
