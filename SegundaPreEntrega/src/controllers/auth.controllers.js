import cartsModel from '../models/carts.model.js'
import userModel from '../models/users.model.js'

const register = async (req, res) => {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await userModel.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' })
    }

    // Crear el usuario
    const newUser = await userModel.create(req.body)
    
    // Crear un carrito para el usuario
    const newCart = await cartsModel.create({ products: [] })
    
    // Asignar el carrito al usuario
    newUser.cart = newCart._id
    await newUser.save()

    res.status(201).json({ message: 'Usuario registrado con éxito' })
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export { register }
