import { Router } from "express"
import userModel from "../models/users.model.js"
/* import { signup } from '../controllers/auth.controllers.js' */

const usersRouter = Router()

//GET
/* usersRouter.get('/', async (req, res) => {
    try {
        let users = await userModel.find()
        res.send({ result: 'success', payload: users })
      

    } catch (error) {
        console.error("Failed to get users" + error)
        res.status(500).send("Error interno del servidor")
    }

}) */


//POST
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

/* usersRouter.post('/register', signup)
 */
//PUT

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


//DELETE

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
