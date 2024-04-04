import { Router } from "express"
import ProductManager from "../productManager.js"

const productManager = new ProductManager()
const productsdbRouter = Router()

// GET
productsdbRouter.get('/', async (req, res) => {
    try {
        let { page = 1, limit = 10, sort } = req.query

       /*  const username = req.session.user ? req.session.user.username : null */
        const result = await productManager.getAllProducts(page,limit,sort)

        res.render('productsdb',result)
    } catch (error) {
        console.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
})

// POST
productsdbRouter.post("/", async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        console.error("Error al crear un nuevo producto:", error)
        res.status(500).send("Error interno del servidor")
    }
})

// GET de detalle producto por id
productsdbRouter.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const product = await productManager.getProductById(productId)
        if (!product) {
            return res.status(404).send('Producto no encontrado')
        }

        res.render('productDetail', product)
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error)
        res.status(500).send('Error interno del servidor')
    }
})

// PUT
productsdbRouter.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id
        const updatedProduct = await productManager.updateProduct(productId, req.body)
        if (!updatedProduct) {
            return res.status(404).send("Producto no encontrado")
        }
        res.json(updatedProduct)
    } catch (error) {
        console.error("Error al actualizar el producto:", error)
        res.status(500).send("Error interno del servidor")
    }
})

// DELETE
productsdbRouter.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id
        const deletedProduct = await productManager.deleteProduct(productId)
        if (!deletedProduct) {
            return res.status(404).send("Producto no encontrado")
        }
        res.json(deletedProduct)
    } catch (error) {
        console.error("Error al eliminar el producto:", error)
        res.status(500).send("Error interno del servidor")
    }
})

export default productsdbRouter