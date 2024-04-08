import productsModel from "./models/products.model.js"


class ProductManager {
    
    async getAllProducts(page = 1, limit = 10, sort) {
        try {
            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: sort ? { [sort]: 1 } : null,
                lean: true
            }
            const result = await productsModel.paginate({}, options)

            const prevLink = result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : ''
            const nextLink = result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : ''

            result.prevLink = prevLink
            result.nextLink = nextLink

            result.isValid = !(options.page < 1 || options.page > result.totalPages)

            return result
        } catch (error) {
            throw new Error(`Error getting paginated products: ${error}`)
        }
    }
    

    async getProductById(id) {
        try {
            return await productsModel.findById(id)
        } catch (error) {
            throw new Error(`Error getting product by ID: ${error}`)
        }
    }

    async addProduct(productData) {
        try {
            const newProduct = new productsModel(productData);
            return await newProduct.save();
        } catch (error) {
            throw new Error(`Error adding product: ${error}`);
        }
    }

    async updateProduct(id, newData) {
        try {
            return await productsModel.findByIdAndUpdate(id, newData, { new: true })
        } catch (error) {
            throw new Error(`Error updating product: ${error}`);
        }
    }

    async deleteProduct(id) {
        try {
            return await productsModel.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(`Error deleting product: ${error}`)
        }
    }
}

export default ProductManager