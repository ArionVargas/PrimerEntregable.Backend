import userModel from '../../models/modelsMongo/users.model.js'

class UsersDAO {

    async getAllUsers() {
        try {
            return await userModel.find()
        } catch (error) {
            console.error('Error al obtener usuarios:', error)
            throw new Error('Error al obtener usuarios')
        }
    }

    async addCartToUser(userId, cartId) {
        try {
            const user = await userModel.findById(userId)
            if (!user) {
                throw new Error('Usuario no encontrado')
            }

            user.cart.push({ cart: cartId })
            await user.save()

            return true
        } catch (error) {
            console.error('Error al agregar carrito al usuario:', error)
            return false
        }
    }

    async getUserByEmail(email) {
        try {
            return await userModel.findOne({ email })
        } catch (error) {
            throw new Error(`Error al obtener usuario por email: ${error.message}`)
        }
    }

    async createUser(userData) {
        try {
            const newUser = new userModel(userData)
            return await newUser.save()
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`)
        }
    }

    async getUserById(id) {
        try {
            return await userModel.findById(id)
        } catch (error) {
            throw new Error(`Error al obtener usuario por ID: ${error.message}`)
        }
    }

    async updateUser(id, updateData) {
        try {
            return await userModel.findByIdAndUpdate(id, updateData, { new: true })
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`)
        }
    }

    async deleteUser(id) {
        try {
            return await userModel.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`)
        }
    }
}

export default UsersDAO
