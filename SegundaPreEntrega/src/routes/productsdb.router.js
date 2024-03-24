import { Router } from "express"
import productsModel from "../models/products.model.js"

const productsdbRouter = Router()

//GET

productsdbRouter.get('/', async (req, res) => {
    try {
        let { page = 1, limit = 10, sort } = req.query
        page = parseInt(page)
        limit = parseInt(limit)

        const options = {
            page,
            limit,
            sort: sort ? { [sort]: 1 } : null, 
            lean: true
        }

        const result = await productsModel.paginate({}, options);
        
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/productsdb?page=${result.prevPage}` : ''
        result.nextLink = result.hasNextPage ? `http://localhost:8080/api/productsdb?page=${result.nextPage}` : ''

        result.isValid = !(page < 1 || page > result.totalPages)

        res.render('productsdb',result)
    } catch (error) {
        console.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
})


//POST 

productsdbRouter.post("/", async (req, res) => {
    try {
        const newProduct = await productsModel.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al crear un nuevo producto:", error);
        res.status(500).send("Error interno del servidor");
    }
})


//GET de detalle producto   

productsdbRouter.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const product = await productsModel.findById(productId)
        if (!product) {
            return res.status(404).send('Producto no encontrado')
        }

        res.render('productDetail',  product )
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error)
        res.status(500).send('Error interno del servidor');
    }
})

// PUT
productsdbRouter.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await productsModel.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).send("Producto no encontrado");
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send("Error interno del servidor");
    }
});

// DELETE
productsdbRouter.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productsModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).send("Producto no encontrado");
        }
        res.json(deletedProduct);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send("Error interno del servidor");
    }
});

export default productsdbRouter