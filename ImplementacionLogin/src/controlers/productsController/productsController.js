// controllers/productsController.js
import productsDAO from '../../services/dao/mongodb/productsDAO.js'

const productsDaoInstance = new productsDAO()

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
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
        console.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
}

// Crear producto nuevo 
export const crearProducto = async (req, res) => {
    try {
        const newProduct = await productsDaoInstance.addProduct(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        console.error("Error al crear un nuevo producto:", error)
        res.status(500).send("Error interno del servidor")
    }
}

// Obetener producto por id
export const obtenerProductoPorId = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await productsDaoInstance.getProductById(productId)
    
        if (!product) {
            return res.status(404).send('Producto no encontrado')
        }
        const user = req.user
        const cartId = user && user.cart ? user.cart[0] : null 
    
        res.render('productDetail', { ...product.toObject(), cartId }) 
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error)
        res.status(500).send('Error interno del servidor')
    }
}

// Atualizar producto
export const actualizarProducto = async (req, res) => {
    try {
        const productId = req.params.id
        const updatedProduct = await productsDaoInstance.updateProduct(productId, req.body)
        if (!updatedProduct) {
            return res.status(404).send("Producto no encontrado")
        }
        res.json(updatedProduct)
    } catch (error) {
        console.error("Error al actualizar el producto:", error)
        res.status(500).send("Error interno del servidor")
    }
}

// Eliminar producto
export const eliminarProducto = async (req, res) => {
    try {
        const productId = req.params.id
        const deletedProduct = await productsDaoInstance.deleteProduct(productId)
        if (!deletedProduct) {
            return res.status(404).send("Producto no encontrado")
        }
        res.json(deletedProduct)
    } catch (error) {
        console.error("Error al eliminar el producto:", error)
        res.status(500).send("Error interno del servidor")
    }
}
