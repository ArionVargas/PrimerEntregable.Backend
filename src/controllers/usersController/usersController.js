
import UsersDAO from '../../services/dao/mongodb/usersDAO.js'

const usersDAO = new UsersDAO()

export const getAllUsers = async (req, res) => {
    try {
        const users = await usersDAO.getAllUsers()
        res.send({ result: 'success', payload: users })
    } catch (error) {
        req.logger.error('No pudo obtener usuarios:', error)
        res.status(500).send("No se pudo obtener usuarios")
    }
}

export const getUserById = async (req, res) => {
    req.logger.debug('Inicio de getUserById')

    try {
        const { id } = req.params; // Cambié req.body a req.params
        const user = await usersDAO.getUserById(id)

        if (!user) {
            req.logger.warning(`Usuario con ID ${id} no encontrado`)
            return res.status(404).send({ result: 'error', message: 'Usuario no encontrado' })
        }

        req.logger.info('Usuario obtenido con éxito')
        res.send({ result: 'success', payload: user })
    } catch (error) {
        req.logger.error(`Error al obtener usuario: ${error.message}`)
        res.status(500).send('No se pudo obtener usuario')
    }
}

export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, cart } = req.body
        const newUser = await usersDAO.createUser({ firstName, lastName, email, password, role, cart })
        res.send({ result: 'success', payload: newUser })
    } catch (error) {
        req.logger.error('No pudo guardar usuario:', error)
        res.status(500).send("No se pudo guardar usuario")
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const updatedUser = await usersDAO.updateUser(id, updateData)
        res.send({ result: 'success', payload: updatedUser })
    } catch (error) {
        req.logger.error('No pudo actualizar usuario:', error)
        res.status(500).send("No se pudo actualizar usuario")
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await usersDAO.deleteUser(id)
        res.send({ result: 'success', payload: deletedUser })
    } catch (error) {
        req.logger.error('No pudo eliminar usuario:', error)
        res.status(500).send("No se pudo eliminar usuario")
    }
}
