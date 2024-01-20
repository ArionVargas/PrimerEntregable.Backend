
class ProductManager {
    constructor() {
        this.products = []
    }

    static id = 0

    addProduct(title, description, precio, image, code, stock) {
        // Verificar si el código ya existe
        if (this.products.some(product => product.code === code)) {
            console.log(`El código ${code} ya está en uso`)
        } else {
            const newProduct = {
                title,
                description,
                precio,
                image,
                code,
                stock,
                id: ++ProductManager.id,
            };

            if (!Object.values(newProduct).includes(undefined)) {
                this.products.push(newProduct)
            } else {
                console.log("Falta agregar un campo")
            }
        }
    }

    getProducts() {
        return this.products
    }

    existeProducto(id) {
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id) {
        const product = this.existeProducto(id)
        !product ? console.log("Not Found") : console.log(product)
    }
}

const productos = new ProductManager()

productos.addProduct("zapatilla", "zapa deportiva", 45000, "", "a1", 5)
productos.addProduct("remera", "manga corta", 5000, "", "a2", 7)

console.log(productos.getProducts())

productos.addProduct("celular", 110000, "", "a3", 2)

console.log(productos.getProducts())

//prueba de git