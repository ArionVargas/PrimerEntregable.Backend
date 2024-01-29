
const fs = require("fs")

class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        console.log(newProduct)

        await fs.promises.writeFile(this.patch, JSON.stringify(this.products))

    }

    readProducts = async () => {

        try {
            let respuesta = await fs.promises.readFile(this.patch, "utf-8")
            return JSON.parse(respuesta)
        } catch (error) {
            console.error("Error al leer el archivo de productos:", error)
            return []
        }

    }

    getProducts = async () => {

        try {
            let respuesta2 = await this.readProducts();
            if (respuesta2 && Array.isArray(respuesta2)) {
                console.log(`productos encontrados en ProductManager: ${respuesta2.length}`)
                return respuesta2
            } else {
                console.log("No se pudieron obtener los productos o la respuesta no es un array.")
                return []
            }
        } catch (error) {
            console.error("Error al obtener los productos:", error)
            return []
        }
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)) {
            console.log("Producto no encontrado")
        } else {
            console.log(respuesta3.find(product => product.id === id))
        }
    }

    deleteProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.promises.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("producto eliminado")
    }

    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductById(id)
        let productOld = await this.readProducts()

        let productsMod = [
            { ...producto, id }, ...productOld]
        await fs.promises.writeFile(this.patch, JSON.stringify(productsMod))
    }
}

const productos = new ProductManager

/* productos.addProduct("producto1", "desciption1", 10, "imagen1", "abc1", 4)
productos.addProduct("producto2", "desciption2", 20, "imagen2", "abc2", 5)
productos.addProduct("producto3", "desciption3", 30, "imagen3", "abc3", 5) */

/* productos.getProductsById(2 )
 */
/* productos.deleteProductById(2) */

/* productos.updateProducts({
    title: "producto3",
    description: "description3",
    price: 25,
    img: "imagen3",
    code: "abc3",
    stock: 6,
    id: 3
}) */

/* console.log(ProductManager.getProducts) */

/* productos.getProducts() */

module.exports = ProductManager