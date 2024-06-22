import MongoSingleton from "../../../config/mongodbSingleton.js"
import cartsModel from '../../models/modelsMongo/carts.model.js'
import productsModel from "../../models/modelsMongo/products.model.js"
import mongoose from "mongoose"

class CartDao {
  constructor() {
    MongoSingleton.getInstance()
  }

  async getCarts() {
    try {
      return await cartsModel.find()
    } catch (error) {
      console.error('Error al obtener los carritos:', error)
      return []
    }
  }

  async getCartById(cartId) {
    try {
      return await cartsModel.findById(cartId)
    } catch (error) {
      console.error('Error al obtener el carrito por ID:', error)
      return null
    }
  }

  async getCartWithProducts(cartId) {
    console.log(cartId)
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
        throw new Error('Invalid cart ID en getCartWithProducts')
    }

    try {
        const cart = await cartsModel.findById(cartId).populate('products.product_id').exec()
        if (!cart) {
            throw new Error('Carrito no encontrado')
        }
        return cart
    } catch (error) {
        console.error('Error al obtener el carrito con productos:', error.message)
        throw error
    }
}

  async addCart(cart) {
    try {
      const result = await cartsModel.create(cart)
      return result
    } catch (error) {
      console.error('Error al agregar un carrito:', error)
      return null
    }
  }

  async updateCart(cartId, updatedCart) {
    try {
      return await cartsModel.findByIdAndUpdate(cartId, updatedCart, { new: true })
    } catch (error) {
      console.error('Error al actualizar el carrito:', error)
      return null
    }
  }

  async addProductCart(cartId, product_id) {
    try {
      const cart = await cartsModel.findById(cartId)
      if (!cart) {
        throw new Error('Carrito no encontrado')
      }
      const product = await productsModel.findById(product_id)
      if (!product) {
        throw new Error('Producto no encontrado')
      }
      if (product.stock <= 0) {
        throw new Error('Producto sin stock')
      }

      // Verifica si el producto ya está en el carrito
      const productIndex = cart.products.findIndex(p => p.product_id.toString() === product_id)
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1
      } else {
        cart.products.push({ product_id: product_id, quantity: 1 })
      }

      product.stock -= 1
      await product.save()
      await cart.save()
    } catch (err) {
      throw new Error(`Error al agregar producto al carrito: ${err.message}`)
    }
  }

  async getCartByUserId(userId) {
    try {
      return await cartsModel.findOne({ user: userId })
    } catch (error) {
      console.error('Error al obtener el carrito por ID de usuario:', error)
      return null
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartsModel.findById(cartId)
      if (!cart) {
        throw new Error('Carrito no encontrado')
      }
      const productIndex = cart.products.findIndex(p => p.product_id.toString() === productId)
      if (productIndex === -1) {
        throw new Error('Producto no encontrado en el carrito')
      }

      const product = await productsModel.findById(productId)
      if (product) {
        product.stock += cart.products[productIndex].quantity
        await product.save()
      }

      cart.products.splice(productIndex, 1)
      await cart.save()
    } catch (err) {
      throw new Error(`Error al eliminar producto del carrito: ${err.message}`)
    }
  }

  async deleteCart(cartId) {
    try {
      return await cartsModel.findByIdAndDelete(cartId)
    } catch (error) {
      console.error('Error al eliminar el carrito:', error)
      return null
    }
  }
}

export default CartDao
