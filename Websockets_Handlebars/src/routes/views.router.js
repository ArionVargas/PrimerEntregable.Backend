import express from "express"
import { productManager } from "../index.js"

const router = express.Router()


router.get("/admin", async (req ,res )=>{

    const products = await productManager.getProducts()
    console.log("Productos recibidos:", products)


    res.render("index",{
        products
    })
})


export default router