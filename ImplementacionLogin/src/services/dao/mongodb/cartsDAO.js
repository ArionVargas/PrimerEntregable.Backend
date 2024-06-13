import MongoSingleton from "../../../config/mongodbSingleton.js"
import cartsModel from '../../models/modelsMongo/carts.model.js'


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
    try {
      return await cartsModel.findById(cartId).populate('products.product_id')
    } catch (error) {
      console.error('Error al obtener el carrito con productos:', error)
      return null
    }
  }

  async addCart(cart) {
    try {
      return await cartsModel.create(cart)
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

  async addProductCart(cartId, productId) {
    try {
      const cart = await cartsModel.findById(cartId)
      if (!cart) {
        throw new Error('Carrito no encontrado')
      }
      // Verifica si el producto ya está en el carrito
      const productIndex = cart.products.findIndex(product => product.product_id.toString() === productId)
      if (productIndex !== -1) {
        // Si el producto ya está en el carrito, puedes incrementar la cantidad o manejarlo según tu lógica
        cart.products[productIndex].quantity += 1
      } else {
        // Si el producto no está en el carrito, añádelo
        cart.products.push({ productId, quantity: 1 })
      }
      await cart.save()
    } catch (err) {
      throw new Error(`Error al agregar producto al carrito: ${err.message}`)
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
