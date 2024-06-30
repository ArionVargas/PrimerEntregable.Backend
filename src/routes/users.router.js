import { Router } from "express"
import { getAllUsers, createUser, updateUser, deleteUser } from "../controllers/usersController/usersController.js"

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.post('/', createUser)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter
