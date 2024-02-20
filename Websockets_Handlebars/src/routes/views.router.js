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
    res.render("home",{products})
})


export default router