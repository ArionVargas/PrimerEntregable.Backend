import express from 'express'
import passport from 'passport'
import { generateJWToken } from '../../utils.js'
import { registerUser,loginUser } from '../controllers/auth.controller.js'



const authRouter = express.Router()

authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {

})


authRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    const user = req.user
    console.log('en authrouter user...')
    console.log(user)
    req.session.user = {
        name: user.firstName,
        email: user.email,
    }
    console.log(user.firstName)
    res.redirect('/api/products')


})

authRouter.post("/register", registerUser)

authRouter.post("/login", loginUser)

authRouter.post('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ error: 'error logout', message: 'error al cerrar sesión' })
        } else {
            res.redirect('/login')
        }
    })
})


export default authRouter
