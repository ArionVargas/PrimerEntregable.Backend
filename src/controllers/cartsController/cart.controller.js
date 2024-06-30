// cart.controller.js
import cartsDAO from '../../services/dao/mongodb/cartsDAO.js'

const cartsDaoInstance = new cartsDAO()

export const renderCart = async (req, res) => {

    req.logger.debug('Inicio de renderCart')

    try {
        const cartId = req.session.cartId; // Asegúrate de que el cartId esté en la sesión
        if (!cartId) {

            req.logger.warning('Carrito no encontrado en la sesión')

            return res.status(400).send("Carrito no encontrado en la sesión")
        }
        const cart = await cartsDaoInstance.getCartWithProducts(cartId)

        req.logger.info('Carrito obtenido con éxito')

        res.render('cart', { cart })
    } catch (err) {

        req.logger.error(`Error al obtener el carrito: ${err.message}`)

        res.status(500).send({ message: err.message })
    }
}
