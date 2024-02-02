

import fs from "fs"

class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
        this.id = 0
        this.fileExists()
    }


    fileExists = async () => {
        try {
            await fs.promises.readFile(this.patch, 'utf-8')
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.createFile()
            } else {
                throw error
            }
        }
    }

    createFile = async () => {
        try {
           
            await fs.promises.writeFile(this.patch, "[]")
        } catch (error) {
            console.error("Error al crear el archivo de productos:", error)
        }
    }

    addProduct = async (title, description, price, img, code, stock) => {
        try {

            const fileContent = await fs.promises.readFile(this.patch, "utf-8")
            const existingData = JSON.parse(fileContent)


            this.id++
            const newProduct = {
                title,
                description,
                price,
                img,
                code,
                stock,
                id: this.id
            }

            existingData.push(newProduct)

            await fs.promises.writeFile(this.patch, JSON.stringify(existingData))

            console.log(newProduct)
        } catch (error) {
            console.error("Error al agregar un producto:", error)
        }
    }

    readProducts = async () => {
        try {
            const fileContent = await fs.promises.readFile(this.patch, "utf-8")
            return JSON.parse(fileContent)
        } catch (error) {
            console.error("Error al leer el archivo de productos:", error)
            return []
        }
    }

    getProducts = async () => {

        const response = await this.readProducts()
        if (response && Array.isArray(response)) {
            console.log(`Productos encontrados en ProductManager: ${response.length}`)
            return response
        } else {
            console.log("No se pudieron obtener los productos o la respuesta no es un array.")
            return []
        }

    }

    getProductsById = async (id) => {
        try {
            const allProducts = await this.readProducts()

            const productById = allProducts.find(product => product.id === id)

            if (productById !== undefined) {
                return productById
            } else {
                console.log("No se encontró un producto con el ID proporcionado.")
                return null
            }
        } catch (error) {
            console.error("Error al obtener los productos:", error)
            return null
        }
    }


    deleteProductById = async (id) => {
        try {
            const response = await this.readProducts()
            const productFilter = response.filter(products => products.id != id)
            await fs.promises.writeFile(this.patch, JSON.stringify(productFilter))
            console.log("Producto eliminado")
        } catch (error) {
            console.error("Error al eliminar el producto:", error)
        }
    }

    updateProducts = async ({ id, ...producto }) => {
        try {
            await this.deleteProductById(id)
            const productOld = await this.readProducts()
            const productsMod = [{ ...producto, id }, ...productOld]
            await fs.promises.writeFile(this.patch, JSON.stringify(productsMod))
        } catch (error) {
            console.error("Error al actualizar los productos:", error)
        }
    }
}

const productos = new ProductManager()
productos.addProduct("producto1", "desciption1", 10, "imagen1", "abc1", 4)
productos.addProduct("producto2", "desciption2", 20, "imagen2", "abc2", 5)
productos.addProduct("producto3", "desciption3", 30, "imagen3", "abc3", 5)
productos.addProduct("producto4", "desciption4", 40, "imagen4", "abc4", 5)
productos.addProduct("producto5", "desciption5", 50, "imagen5", "abc5", 5)
productos.addProduct("producto6", "desciption6", 60, "imagen6", "abc6", 5)
productos.addProduct("producto7", "desciption7", 70, "imagen7", "abc7", 5)

export default productos
