import express from "express"
import { productManager } from "../index.js"

const router = express.Router()


router.get("/", async (req ,res )=>{

    const products = await productManager.getProducts()

    res.render("home",{
        products
    })
})

router.get("/realtimeproducts", async (req, res )=>{
    const products = await productManager.getProducts()
    res.render("realtimeproducts",{products})
})

router.get("/login", (req, res) => {
    res.render("login"); // Renderizar plantilla de inicio de sesión
});

// Ruta para la página de registro
router.get("/register", (req, res) => {
    res.render("register"); // Renderizar plantilla de registro
});


export default router