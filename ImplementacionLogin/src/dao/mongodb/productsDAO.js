import productsModel from '../../models/modelsMongo/products.model.js'
import MongoSingleton from '../../config/mongodbSingleton.js'

class ProductsDAO {
  constructor(){
    MongoSingleton.getInstance()
  }

  async getAllProducts() {
    try {
      return await productsModel.find()
    } catch (err) {
      console.error('Error al obtener los productos:', err)
      return []
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
      return await productsModel.create(productData);
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
