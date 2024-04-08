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

router.get('/logout', (req,res)=>{
    req.session.destroy(error=>{
        if(error){
            res.json({error: 'error logout',massage: 'error al cerrar session'})
        }
        res.send('session cerrada correctamente')
    })
})



export default router
