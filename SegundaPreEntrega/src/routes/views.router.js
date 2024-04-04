import express from "express"

const router = express.Router()

router.get('/signup',(req,res)=>{
    res.render('register')
})

router.get("/login", (req, res) => {
    res.render("login") // Renderizar plantilla de inicio de sesión
});

router.get('/session',(req,res)=>{
    res.render('session')
})



export default router