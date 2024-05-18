import MongoSingleton from "../../config/mongodbSingleton.js"
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
