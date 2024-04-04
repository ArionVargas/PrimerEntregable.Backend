import userModel from '../models/users.model.js'

export const signup = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { username, email, password } = req.body
        //si el usuario existe enviar a login
        const existUser = await userModel.findOne({email})
        if (existUser) {
            return res.redirect('/login')
        }
        // Crea un nuevo usuario en la base de datos utilizando el modelo de usuario
        const newUser = await userModel.create({ username, email, password })
        // Envía a pag de login respuesta exitosa
        res.redirect('/login')
    } catch (error) {
        // Maneja errores
       /*  res.status(500).json({ message: 'Error al registrar usuario' }) */
        res.redirect('/login')
    }
}

export const logout = (req, res) => {
  // Destruye la sesión
  req.session.destroy();
  // Redirige al usuario a la pantalla de login
  res.redirect('/login');
}

export const login = async (req,res)=>{
    try {
        //extrae datos del cuerpo de la solicitud
        const {email,password} = req.body

        //busca el usuario en la base de datos por correo
        const user = await userModel.findOne({email})

        //verifica si el usuario existe y si la contraseña 
        if (!user || user.password !== password){
            // si son icorrectas las credenciales redirige
            return res.redirect('/login')
        }
        
        req.session.user = user

        res.redirect('/products')
    } catch (error) {
        console.error('Error al iniciar sesion',error)
        res.status(500).json({message:'Error interno del servidor'})
    }
}