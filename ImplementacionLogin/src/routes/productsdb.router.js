import { Router } from "express"
import productsDAO from '../services/dao/mongodb/productsDAO.js'
import { authenticateUser } from "../config/authUtils.js"
import passport from "passport"

const productsdbRouter = Router()
const productsDaoInstance = new productsDAO()


// GET

productsdbRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        let { page = 1, limit = 10, sort } = req.query

        const user = req.user

        const firstName = user ? user.firstName : null

        const result = await productsDaoInstance.getAllProducts(page, limit, sort)
        const products = result
        const isValid = user != null
        res.render('productsdb', { firstName, isValid, products})
    } catch (error) {
        console.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
})


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

productsdbRouter.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await productsDaoInstance.getProductById(productId);
  
      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }
      console.log('en products id')
  console.log(req.user);
      const cartId = req.user && req.user.cart ? req.user.cart : null;
  console.log(cartId);
      res.render('productDetail', { product, cartId }); // Aquí se pasa el product y el cartId a la vista
    } catch (error) {
      console.error('Error al obtener detalles del producto:', error);
      res.status(500).send('Error interno del servidor');
    }
  })

/* productsdbRouter.get('/:id', async (req, res) => {

    try {

        const productId = req.params.id
        const product = await productsDaoInstance.getProductById(productId)
        if (!product) {
            return res.status(404).send('Producto no encontrado')
        }

        const cartId = req.user.cart
        console.log(rq.user);
        console.log(cartId);

        res.render('productDetail', { ...product, cartId })
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error)
        res.status(500).send('Error interno del servidor')
    }
}) */

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
