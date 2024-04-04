import express from 'express'
import { login } from '../controllers/auth.controllers.js'

const router = express.Router()

// Ruta para manejar el inicio de sesión
router.post('/login', login)

export default router
