// cart.controller.js
import cartsDAO from '../../services/dao/mongodb/cartsDAO.js'

const cartsDaoInstance = new cartsDAO()

export const renderCart = async (req, res) => {
    try {
        const cartId = req.session.cartId; // Asegúrate de que el cartId esté en la sesión
        if (!cartId) {
            return res.status(400).send("Carrito no encontrado en la sesión")
        }
        const cart = await cartsDaoInstance.getCartWithProducts(cartId)
        res.render('cart', { cart })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
