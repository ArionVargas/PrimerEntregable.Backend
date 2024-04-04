import express from "express"

const router = express.Router()

router.get("/login", (req, res) => {
    res.render("login")
})

router.get('/signup', (req, res) => {
    res.render('register')
})


router.get('/session', (req, res) => {
    res.render('session')
})

/* router.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect('/products')
    } else {
        res.redirect('/login')
    }
}
) */



export default router