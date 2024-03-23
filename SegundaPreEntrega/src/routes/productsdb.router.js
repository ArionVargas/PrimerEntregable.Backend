import { Router } from "express"
import productsModel from "../models/products.model.js"

const productsdbRouter = Router()

//GET

productsdbRouter.get('/', async (req, res) => {
    let page = parseInt(req.query.page)
    if (!page) page = 1
    let result = await productsModel.paginate({}, { page, limit: 10, lean: true })

    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/productsdb?page=${result.prevPage}` : ''
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/productsdb?page=${result.nextPage}` : ''

    result.isValid = !(page < 1 || page > result.totalPages)

    res.render('productsdb',result)
})


//GET de detalle producto   

productsdbRouter.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const product = await productsModel.findById(productId)
        if (!product) {
            return res.status(404).send('Producto no encontrado')
        }
      
        res.render('productDetail', { product })
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error)
        res.status(500).send('Error interno del servidor');
    }
})

export default productsdbRouter