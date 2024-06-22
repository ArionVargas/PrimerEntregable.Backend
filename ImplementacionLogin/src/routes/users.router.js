import { Router } from "express"
import userModel from "../services/models/modelsMongo/users.model.js"

const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
    try {
        let { name, last_name, email, age } = req.body
        let users = await userModel.create({ name, last_name, email, age })
        res.send({ result: 'success', payload: users })

    } catch (error) {
        console.error("No pudo guardar usuarios con mongoose" + error)
        res.status(500).send("No se pudo guardar usuario")
    }

})

usersRouter.put('/:id', async (req, res) => {
    try {
        let userUpdate = req.body
        let user = await userModel.updateOne({ _id: req.params.id }, userUpdate)
        res.send({ result: 'success', payload: user })

    } catch (error) {
        console.error("No pudo actualizar usuario con mongoose" + error)
        res.status(500).send("No se pudo actualizar usuario")
    }

})


usersRouter.delete('/:id', async (req, res) => {
    try {
        let {id} = req.params
        let user = await userModel.deleteOne({ _id: id })
        res.status(200).send({ result: 'success', payload: user })

    } catch (error) {
        console.error("No pudo eliminar usuario con mongoose" + error)
        res.status(500).send("No se pudo eliminar usuario")
    }

})

export default usersRouter
