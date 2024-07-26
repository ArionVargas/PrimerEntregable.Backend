import { Router } from "express"
import { getAllUsers, createUser, updateUser, deleteUser, getUserById } from "../controllers/usersController/usersController.js"

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/', createUser)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter
