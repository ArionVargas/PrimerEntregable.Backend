import { Router } from "express"
import productsDAO from '../dao/mongodb/productsDAO.js'
import { authenticateUser } from "../config/authUtils.js"

const productsdbRouter = Router()
const productsDaoInstance = new productsDAO()


// GET

productsdbRouter.get('/', async (req, res) => {
    try {
        let { page = 1, limit = 10, sort } = req.query
        const user = await authenticateUser(req) // Autentica al usuario utilizando el token JWT
        const firstName = user ? user.firstName : null // Obtiene el nombre del usuario

        const result = await productsDaoInstance.getAllProducts(page, limit, sort)
        res.render('productsdb', { firstName, ...result })
    } catch (error) {
        console.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
})

/* productsdbRouter.get('/', async (req, res) => {
    try {
        let { page = 1, limit = 10, sort } = req.query
        const user = req.session.user
        const firstName = user ? user.name : null
        const result = await productsDaoInstance.getAllProducts(page, limit, sort)
        
        res.render('productsdb', { firstName , ...result })
    } catch (error) {
        console.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
}) */


// POST
productsdbRouter.post("/", async (req, res) => {
    try {
        const newProduct = await productsDaoInstance.addProduct(req.body)
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
        const product = await productsDaoInstance.getProductById(productId)
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
        const updatedProduct = await productsDaoInstance.updateProduct(productId, req.body)
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
        const deletedProduct = await productsDaoInstance.deleteProduct(productId)
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
