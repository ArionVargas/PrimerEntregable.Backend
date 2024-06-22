import productsModel from '../../models/modelsMongo/products.model.js'
import MongoSingleton from '../../../config/mongodbSingleton.js'

class ProductsDAO {
  constructor() {
    MongoSingleton.getInstance()
  }

  async getAllProducts(page = 1, limit = 10, sort = 'asc') {
    try {
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: sort ? { price: sort } : {}
      }
      const result = await productsModel.paginate({}, options)
     
      return result 
    } catch (error) {
      console.error('Error al obtener todos los productos:', error)
      throw error
    }
  }

  async getProductById(id) {
    try {
      return await productsModel.findById(id)
    } catch (err) {
      console.error('Error al obtener el producto por ID:', err)
      return null
    }
  }

  async addProduct(productData) {
    try {
      return await productsModel.create(productData)
    } catch (err) {
      console.error('Error al agregar un nuevo producto:', err)
      return null
    }
  }

  async updateProduct(id, productData) {
    try {
      return await productsModel.findByIdAndUpdate(id, productData, { new: true })
    } catch (err) {
      console.error('Error al actualizar el producto:', err)
      return null
    }
  }

  async deleteProduct(id) {
    try {
      return await productsModel.findByIdAndDelete(id)
    } catch (err) {
      console.error('Error al eliminar el producto:', err)
      return null
    }
  }
}

export default ProductsDAO
