import userModel from '../models/users.model.js'

export const signup = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { username, email, password } = req.body
        // Crea un nuevo usuario en la base de datos utilizando el modelo de usuario
        const newUser = await userModel.create({ username, email, password })
        // Envía a pag de login respuesta exitosa
        res.redirect('/login')
    } catch (error) {
        // Maneja errores
        res.status(500).json({ message: 'Error al registrar usuario' })
    }
}

export const logout = (req, res) => {
  // Destruye la sesión
  req.session.destroy();
  // Redirige al usuario a la pantalla de login
  res.redirect('/login');
}
