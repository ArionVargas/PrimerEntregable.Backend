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
    /* try {
        let products = await productsModel.find()
        res.send({ result: 'success', payload: products })

    } catch (error) {
        console.error("Failed to get users" + error)
        res.status(500).send("Error interno del servidor")
    } */

    res.render('productsdb',result)
})

export default productsdbRouter