/* import cartsModel from '../models/carts.model.js'


class CartManager {

    async getCarts() {
        try {
            return await cartsModel.find();
        } catch (err) {
            console.error('Error al obtener los carritos:', err)
            return []
        }
    }

    async getCartProducts(id) {
        try {
            const cart = await cartsModel.findById(id)
            return cart ? cart.products : []
        } catch (err) {
            console.error('Error al obtener los productos del carrito:', err)
            return []
        }
    }

    async newCart() {
        try {
            return await cartsModel.create({ products: [] })
        } catch (err) {
            console.error('Error al crear un nuevo carrito:', err)
            return null
        }
    }

    async addProductCart(cart_id, product_id) {
        try {
            const cart = await cartsModel.findById(cart_id)
            if (!cart) {
                console.log('Carrito no encontrado')
                return
            }
            const productIndex = cart.products.findIndex(product => product.product_id.toString() === product_id)
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1
            } else {
                cart.products.push({ product_id, quantity: 1 })
            }
            await cart.save()
            console.log('Producto agregado con éxito')
        } catch (err) {
            console.error('Error al agregar el producto al carrito:', err)
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
          const cart = await cartsModel.findById(cartId)
          if (!cart) {
            throw new Error('Carrito no encontrado')
          }
         
          cart.products = cart.products.filter(product => product._id.toString() !== productId)
          await cart.save()
        } catch (err) {
          throw new Error(`Error al eliminar producto del carrito: ${err.message}`)
        }
      }

      async getCartWithProducts(id) {
        try {
          return await cartsModel.findById(id).populate("products.product_id")
        } catch (err) {
          console.error('Error al obtener el carrito con productos:', err)
          return null
        }
      }
}

export default CartManager */