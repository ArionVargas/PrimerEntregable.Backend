import { Router } from "express"
import CartManager from '../cartsManagerdb.js'

const cartsdbRouter = Router()
const cartManager = new CartManager()

// Obtener todos los carritos
cartsdbRouter.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts()
    res.json(carts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Obtener un carrito específico por su ID
cartsdbRouter.get('/:id', async (req, res) => {
  try {
    const cartProducts = await cartManager.getCartProducts(req.params.id)
    res.json(cartProducts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Crear un nuevo carrito
cartsdbRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.newCart()
    res.status(201).json(newCart)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Añadir un producto a un carrito
cartsdbRouter.post('/add-product', async (req, res) => {
  try {
    const { cart_id, product_id } = req.body
    await cartManager.addProductCart(cart_id, product_id)
    res.json({ message: 'Producto agregado al carrito con éxito' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default cartsdbRouter