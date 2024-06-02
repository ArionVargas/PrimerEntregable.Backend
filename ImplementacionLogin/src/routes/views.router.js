import express from "express"
import { authToken, passportCall } from "../../utils.js"
import passport from "passport"


const router = express.Router()

router.get("/login", (req, res) => {
    console.log('GET /login en viwes')
    res.render("login")
})

router.get('/signup', (req, res) => {
    console.log('GET /signup')
    res.render('register')
})



router.get('/github/login', (req, res) => {
    res.render('github')
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ error: 'error logout', massage: 'error al cerrar session' })
        }
        res.send('session cerrada correctamente')
    })
})


/* router.get('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        res.send('api/prodcutsdb', {
            user: req.user
        })
    })
 */


export default router
