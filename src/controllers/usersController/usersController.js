import UsersDAO from '../../services/dao/mongodb/usersDAO.js'

const usersDAO = new UsersDAO()

export const getAllUsers = async (req, res) => {
    try {
        const users = await usersDAO.getAllUsers()
        res.send({ result: 'success', payload: users })
    } catch (error) {
        console.error('No pudo obtener usuarios:', error)
        res.status(500).send("No se pudo obtener usuarios")
    }
};

export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, cart } = req.body
        const newUser = await usersDAO.createUser({ firstName, lastName, email, password, role, cart })
        res.send({ result: 'success', payload: newUser })
    } catch (error) {
        console.error('No pudo guardar usuario:', error)
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
        console.error('No pudo actualizar usuario:', error)
        res.status(500).send("No se pudo actualizar usuario")
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await usersDAO.deleteUser(id)
        res.send({ result: 'success', payload: deletedUser })
    } catch (error) {
        console.error('No pudo eliminar usuario:', error)
        res.status(500).send("No se pudo eliminar usuario")
    }
}
