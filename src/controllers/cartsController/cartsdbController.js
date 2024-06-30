import cartsDAO from '../../services/dao/mongodb/cartsDAO.js'
import productsDAO from '../../services/dao/mongodb/productsDAO.js'
import Ticket from '../../services/models/modelsMongo/ticket.model.js'
import { sendEmailWithTicket } from '../email.controller.js'
import mongoose from 'mongoose'

const cartsDaoInstance = new cartsDAO()
const productsDaoInstance = new productsDAO()

// Obtener todos los carritos
export const getCarts = async (req, res) => {
    try {
        const carts = await cartsDaoInstance.getCarts()
        res.json(carts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Obtener un carrito específico por su ID
export const getCartById = async (req, res) => {
    try {
        const cartProducts = await cartsDaoInstance.getCartWithProducts(req.params.id)
        res.json(cartProducts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Crear un nuevo carrito
export const createCart = async (req, res) => {
    try {
        const newCart = await cartsDaoInstance.newCart()
        res.status(201).json(newCart)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const getUserCart = async (req, res) => {
   
    try {
        const user = req.user
        
        const cartIdArray = user.cart

        console.log('Usuario actual:', user)
        console.log('ID del carrito:', cartIdArray)

        
        const cartId = Array.isArray(cartIdArray) ? cartIdArray[0].toString() : cartIdArray.toString()

        console.log('ID del carrito después de la extracción:', cartId)

        if (!cartId || !mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).json({ message: 'Carrito no válido o no encontrado' })
        }

        const cart = await cartsDaoInstance.getCartWithProducts(cartId)

        
        res.render('cart', { cart: cart.toObject() })
    } catch (err) {
        console.error('Error al obtener el carrito con productos:', err)
        res.status(500).json({ message: 'Error al obtener el carrito' })
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const { product_id } = req.body
        const { cartId } = req.params

       
        await cartsDaoInstance.addProductCart(cartId, product_id)

        
        const { page = 1, limit = 10, sort } = req.query
        const productsResult = await productsDaoInstance.getAllProducts(page, limit, sort)
        const products = productsResult.docs

        res.redirect('/api/products')
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const completePurchase = async (req, res) => {
 
    try {
        const { cartId } = req.params
        const user = req.user

        const cart = await cartsDaoInstance.getCartWithProducts(cartId)

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' })
        }

        const outOfStockProducts = []
        const purchasedProducts = []

        for (const item of cart.products) {
            const product = await productsDaoInstance.getProductById(item.product_id)
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity
                await product.save()
                purchasedProducts.push(item)
            } else {
                outOfStockProducts.push(item.product_id)
            }
        }

        if (purchasedProducts.length > 0) {
            const amount = purchasedProducts.reduce((total, item) => total + item.product_id.price * item.quantity, 0)
            const purchaser = user.email

            const newTicket = new Ticket({ amount, purchaser })
            await newTicket.save()

            await sendEmailWithTicket(purchaser, newTicket)
            res.status(201).json({ ticket: newTicket, outOfStockProducts })
        } else {
            res.status(400).json({ message: 'No se pudo procesar la compra, productos sin stock suficiente', outOfStockProducts })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        await cartsDaoInstance.deleteProductFromCart(cid, pid)
        res.json({ message: 'Producto eliminado del carrito con éxito' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
