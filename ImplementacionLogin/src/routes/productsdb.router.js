import { Router } from "express"
import productsDAO from '../services/dao/mongodb/productsDAO.js'
import { authenticateUser } from "../config/authUtils.js"
import passport from "passport"

const productsdbRouter = Router()
const productsDaoInstance = new productsDAO()


// GET

productsdbRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log('en products router');
        let { page = 1, limit = 10, sort } = req.query
        console.log(req.query);
        const user = req.user // Autentica al usuario utilizando el token JWT
        console.log(user);
        const firstName = user ? user.firstName : null // Obtiene el nombre del usuario
        console.log(firstName)
        /*  const result = await productsDaoInstance.getAllProducts(page, limit, sort)
         const isValid = user != null;
         console.log(result);
         res.render('productsdb', { firstName, isValid, ...result }) */
        const result = await productsDaoInstance.getAllProducts(page, limit, sort)
        const products = result; // Asume que 'result' es un array de productos
        const isValid = user != null;
        res.render('productsdb', { firstName, isValid, products })
    } catch (error) {
        console.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
})

/* productsdbRouter.get('/', async (req, res) => {
    try {
        console.log('en products router');
        let { page = 1, limit = 10, sort } = req.query
        const user = req.user // Autentica al usuario utilizando el token JWT
        console.log(user);
        const firstName = user ? user.firstName : null // Obtiene el nombre del usuario
        console.log(firstName)
        const result = await productsDaoInstance.getAllProducts(page, limit, sort)
        console.log(result)
        const isValid = user != null;
        res.render('productsdb', { firstName, isValid, ...result })
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
