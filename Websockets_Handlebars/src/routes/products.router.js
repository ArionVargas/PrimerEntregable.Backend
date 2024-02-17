import { Router } from "express"
import { productManager } from "../index.js"


const productsRouter = Router()



productsRouter.get("/", async (req, res) => {
    
    try {
        const { limit } = req.query
        const products = await productManager.getProducts()

        if (limit) {
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }
        return res.json(products)
    } catch (error) {
        console.error("Error al obtener productos:", error)
        res.status(500).send("Error interno del servidor")
    }
})

productsRouter.get("/:pid", async (req, res) => {

    try {
        const { pid } = req.params
        const products = await productManager.getProductsById(pid)
        res.json(products)

    } catch (error) {
        console.error("Error al obtener el producto:", error)
        res.status(500).send("Error interno del servidor")
    }
})

productsRouter.post("/", async (req, res) => {
    try {
        const { title, description, price, img, code, stock, status, category } = req.body
        const response = await productManager.addProduct({ title, description, price, img, code, stock, status, category })
        res.json(response)

    } catch (error) {
        console.log(error)
        res.send("No se pudo agregar el producto coorectamente")
    }

})

productsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params
    try {
        const { title, description, price, img, code, stock, status, category } = req.body
        const response = await productManager.updateProducts(pid, { title, description, price, img, code, stock, status, category })
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send(`El producto ${pid} no se pudo actualizar`)
    }
})

productsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params

    try {
        await productManager.deleteProductById(pid)
        res.send(`Producto con ${pid} a sido eliminado con exito`)
    } catch (error) {
        console.log(error)
        res.send("El producto no ha sido eliminado")
    }
})




export { productsRouter }
