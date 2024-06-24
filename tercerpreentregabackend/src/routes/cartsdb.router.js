import passport from "passport"
import { Router } from "express"
import { 
    getCarts, 
    getCartById, 
    createCart, 
    addProductToCart, 
    deleteProductFromCart,
    completePurchase,
    getUserCart
} from "../controlers/cartsController/cartsdbController.js"

const cartsdbRouter = Router()


cartsdbRouter.get('/cart', passport.authenticate('jwt', { session: false }), getUserCart)

// Obtener todos los carritos
cartsdbRouter.get('/', getCarts)

// Obtener un carrito específico por su ID
cartsdbRouter.get('/:id', getCartById)

// Crear un nuevo carrito
cartsdbRouter.post('/', createCart)

// Añadir un producto a un carrito
cartsdbRouter.post('/:cartId/add-product', addProductToCart)

// Completar la compra y generar un ticket
cartsdbRouter.post('/:cartId/complete-purchase', passport.authenticate('jwt', { session: false }), completePurchase)

// Eliminar producto del carrito por ID
cartsdbRouter.delete('/:cid/products/:pid', deleteProductFromCart)



export default cartsdbRouter

