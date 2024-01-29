

const ProductManager = require("./segundoEntregable")
let productManager = new ProductManager

console.log(productManager)

let persistirProducto = async () =>{
    
    await productManager.addProduct("titulo4", "desciption4", 40, "imagen4", "abc4", 7)
    let productosTotales = await productManager.getProducts()

    if (productosTotales && productosTotales.length !== undefined) {
        console.log(`productos encontrados en ProductManager: ${productosTotales.length}`)
        console.log(productosTotales)
    } else {
        console.log("No se pudieron obtener los productos o la longitud no está definida.")
    }
}

persistirProducto()