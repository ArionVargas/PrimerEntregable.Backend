

import express from "express"
import { ProductManager, productos } from "./productManager.js"  // Cambiado el nombre de la instancia

const app = express()
const PORT = 8080


app.get("/products", async (req, res) => {
    try {
        const allProducts = await productos.getProducts()
        console.log(allProducts)
        res.json(allProducts)
    } catch (error) {
        console.error("Error al obtener productos:", error)
        res.status(500).send("Error interno del servidor")
    }
})

app.get("/products/:id", async (req, res) => {
    const productId = parseInt(req.params.id)

    try {
        const product = await productos.getProductsById(productId)

        if (product) {
            res.json(product)
        } else {
            res.status(404).send("Producto no encontrado")
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error)
        res.status(500).send("Error interno del servidor")
    }
})

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`)
})
