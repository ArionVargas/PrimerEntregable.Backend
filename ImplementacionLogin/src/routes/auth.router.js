import express from 'express'
/* import userModel from '../models/users.model.js' */
import passport from 'passport'
import { generateJWToken } from '../../utils.js'

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

authRouter.post("/register", passport.authenticate('register', {
    session: false,
    successRedirect: '/login',
    failureRedirect: '/signup',
}))

authRouter.post("/login", passport.authenticate('login', {
    failureRedirect: '/login'
}), async (req, res) => {
    const user = req.user
    console.log('en authrouter user...')
    console.log(user)
    if (!user) return res.status(401).send({ status: "error", error: "El usuario y la Contraseña son incorrectos" })
    const access_token = generateJWToken(user)
    console.log(access_token)
    /* res.send({access_token: access_token}) */
    res.cookie('jwtCookieToken', access_token, {
        maxAge: 60000,
        httpOnly: false
    })
    res.status(200).json({ status: 'success', user })
     /* res.redirect('/api/products') */

}
)


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
