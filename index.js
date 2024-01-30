

const ProductManager = require("./segundoEntregable")
let productManager = new ProductManager

console.log(productManager)

let persistirProducto = async () =>{
    
    await productManager.addProduct("titulo1", "desciption1", 40, "imagen1", "abc1", 7)
    await productManager.addProduct("titulo2", "desciption2", 50, "imagen2", "abc2", 4)
    let productosTotales = await productManager.getProducts()

    if (productosTotales && productosTotales.length !== undefined) {
        console.log(`productos encontrados en ProductManager: ${productosTotales.length}`)
        console.log(productosTotales)
    } else {
        console.log("No se pudieron obtener los productos o la longitud no está definida.")
    }
}

persistirProducto()