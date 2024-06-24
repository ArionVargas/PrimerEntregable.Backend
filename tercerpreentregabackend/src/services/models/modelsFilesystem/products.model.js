import fs from 'fs'
import path from 'path'

const productsFilePath = path.join(__dirname, '..', '..', 'data', 'products.json')

export const getProductsFromFile = async () => {
    try {
        const data = await fs.promises.readFile(productsFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error al leer los productos desde el archivo:', error)
        return []
    }
};

export const saveProductsToFile = async (products) => {
    try {
        await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2))
    } catch (error) {
        console.error('Error al guardar los productos en el archivo:', error)
    }
}
