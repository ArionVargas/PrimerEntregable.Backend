import { promises as fs } from "fs"
import { v4 as uuidv4 } from "uuid"


export class ProductManager {
    constructor() {
        this.path = "products.json"
        this.products = []
    }

    addProduct = async ({ title, description, price, img, code, stock, status, category }) => {
        const id = uuidv4()
        try {
            let newProduct = {
                id,
                title,
                description,
                price,
                img,
                code,
                stock,
                status,
                category
            }

            this.products = await this.getProducts()

            this.products.push(newProduct)

            await fs.writeFile(this.path, JSON.stringify(this.products))

            return newProduct
        } catch (error) {
            console.error("Error al agregar un producto:", error)
        }
    }


    getProducts = async () => {
        const response = await fs.readFile(this.path, "utf8")
        const responseJSON = JSON.parse(response)

        return responseJSON
    }

    getProductsById = async (id) => {
        const response = await this.getProducts()
        const product = response.find(product => product.id === id)

        if (product) {
            return product
        } else {
            console.log("Producto no encontrado")
        }
    }

    updateProducts = async (id, { ...producto }) => {
        const response = await this.getProducts()
        const index = response.findIndex(product => product.id === id)

        if (index != -1) {
            response[index] = { id, ...producto }
            await fs.writeFile(this.path, JSON.stringify(response))
            /* await fs.readFile(this.path, JSON.stringify(response)) */
            return response[index]
        } else {
            console.log("Producto no encontrado")
        }

    }

    deleteProductById = async (id) => {
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === id)
        if (index != -1) {
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
        } else {
            console.log("No se pudo eliminar el producto")
        }
    }


}

