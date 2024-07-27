// controllers/productsController.js
import productsDAO from '../../services/dao/mongodb/productsDAO.js'

const productsDaoInstance = new productsDAO()

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {

    req.logger.debug('Inicio de obtenerProductos')

    try {
        const { page = 1, limit = 10, sort = 'asc' } = req.query
        const user = req.user
        const firstName = user ? user.firstName : null

        const result = await productsDaoInstance.getAllProducts(page, limit, sort)
        const products = result.docs

        const totalPages = result.totalPages
        const currentPage = result.page
        const hasPrevPage = result.hasPrevPage
        const hasNextPage = result.hasNextPage
        const prevLink = result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}&sort=${sort}` : null
        const nextLink = result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}&sort=${sort}` : null

        const isValid = user != null

        req.logger.info('Productos obtenidos con éxito')

        res.render('productsdb', {
            firstName,
            isValid,
            products,
            totalPages,
            currentPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        })
    } catch (error) {
        req.logger.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
}

// Crear producto nuevo 
export const crearProducto = async (req, res) => {

    req.logger.debug('Inicio de crearProducto')

    try {
        const newProduct = await productsDaoInstance.addProduct(req.body)
        req.logger.info('Producto creado con éxito')
        res.status(201).json(newProduct)
    } catch (error) {
        req.logger.error('Error al crear un nuevo producto:', error)
        res.status(500).send("Error interno del servidor")
    }
}

// Obetener producto por id
export const obtenerProductoPorId = async (req, res) => {

    req.logger.debug('Inicio de obtenerProductoPorId')

    try {
        const productId = req.params.id
        const product = await productsDaoInstance.getProductById(productId)

        if (!product) {

            req.logger.warning(`Producto con id:${productId} no encontrado`)
            return res.status(404).send('Producto no encontrado')
        }
        const user = req.user
        const cartId = user && user.cart ? user.cart[0] : null

        req.logger.info('Producto obtenido con éxito')
        res.render('productDetail', { ...product.toObject(), cartId })
    } catch (error) {

        req.logger.error('Error al obtener detalles del producto:', error)
        res.status(500).send('Error interno del servidor')
    }
}

// Atualizar producto
export const actualizarProducto = async (req, res) => {

    req.logger.debug('Inicio de actualiarProducto')

    try {
        const productId = req.params.id
        const updatedProduct = await productsDaoInstance.updateProduct(productId, req.body)

        if (!updatedProduct) {

            req.logger.warning(`Producto con ID ${productId} no encontrado`)
            return res.status(404).send("Producto no encontrado")
        }

        req.logger.info('Producto actualizado con éxito')

        res.json(updatedProduct)

    } catch (error) {

        req.logger.error('Error al actualizar el producto:', error)
        res.status(500).send("Error interno del servidor")
    }
}

// Eliminar producto
export const eliminarProducto = async (req, res) => {

    req.logger.debug('Inicio de elimiarProducto')

    try {
        const productId = req.params.id
        const deletedProduct = await productsDaoInstance.deleteProduct(productId)
        if (!deletedProduct) {

            req.logger.warning(`Producto con ID ${productId} no encontrado`)
            return res.status(404).send("Producto no encontrado")
        }

        req.logger.info('Producto eliminado con éxito')
        res.json(deletedProduct)
    } catch (error) {
        
        req.logger.error('Error al eliminar el producto:', error)
        res.status(500).send("Error interno del servidor")
    }
}
