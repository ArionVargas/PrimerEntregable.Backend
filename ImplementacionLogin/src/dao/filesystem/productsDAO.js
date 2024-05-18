import { getProductsFromFile, saveProductsToFile } from '../../models/modelsFilesystem/products.model.js'

class ProductDaoFilesystem {
    async getAllProducts() {
        return await getProductsFromFile()
    }

    async getProductById(id) {
        const products = await getProductsFromFile()
        return products.find(product => product.id === id)
    }

    async addProduct(product) {
        const products = await getProductsFromFile()
        products.push(product)
        await saveProductsToFile(products)
        return product
    }

    async updateProduct(id, updatedProduct) {
        const products = await getProductsFromFile()
        const index = products.findIndex(product => product.id === id)
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct }
            await saveProductsToFile(products)
            return products[index]
        }
        return null
    }

    async deleteProduct(id) {
        let products = await getProductsFromFile()
        products = products.filter(product => product.id !== id)
        await saveProductsToFile(products)
        return { message: 'Producto eliminado con éxito' }
    }
}

export default ProductDaoFilesystem
