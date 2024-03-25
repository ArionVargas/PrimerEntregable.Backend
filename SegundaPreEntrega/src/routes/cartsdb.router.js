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

cartsdbRouter.post('/:cartId/add-product', async (req, res) => {
  try {
    const { product_id } = req.body;
    const { cartId } = req.params;
    await cartManager.addProductCart(cartId, product_id);
    res.json({ message: 'Producto agregado al carrito con éxito' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

//Eliminar producto del carrito por ID
cartsdbRouter.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params
    await cartManager.deleteProductFromCart(cid, pid)
    res.json({ message: 'Producto eliminado del carrito con éxito' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default cartsdbRouter