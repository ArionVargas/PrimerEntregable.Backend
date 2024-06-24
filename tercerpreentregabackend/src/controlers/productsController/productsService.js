import ProductDaoMongo from '../dao/mongodb/productsDAO.js'
const productDao = new ProductDaoMongo()


/* import ProductDaoFilesystem from '../dao/filesystem/productsDAO.js'
const productDao = new ProductDaoFilesystem() */

export const getAllProducts = async () => {
    return await productDao.getAllProducts()
}

export const getProductById = async (productId) => {
    return await productDao.getProductById(productId)
}

export const addProduct = async (product) => {
    return await productDao.addProduct(product)
}

export const updateProduct = async (productId, updatedProduct) => {
    return await productDao.updateProduct(productId, updatedProduct)
}

export const deleteProduct = async (productId) => {
    return await productDao.deleteProduct(productId)
}
