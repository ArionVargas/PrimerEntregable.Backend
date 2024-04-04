/* import userModel from '../models/users.model.js'

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const existUser = await userModel.findOne({ email })
        if (existUser) {
            return res.redirect('/login')
        }

        const newUser = await userModel.create({ firstName, lastName, email, password })

        res.redirect('/login')
    } catch (error) {
      
        res.status(500).redirect('/signup?error=ServerError')
        
    }
}

export const logout = (req, res) => {

    req.session.destroy();

    res.redirect('/login');
}

export const login = async (req, res) => {
    try {
      
        const { email, password } = req.body

      
        const user = await userModel.findOne({ email, password })
     
        if (!user) {
       
            return res.redirect('/login')
        }

  
        if (user.password !== password) {
           
            return res.redirect('/login')
        }
        req.session.user = {
            firstName: `${user.firstName}`
        }

        res.redirect('/products')
    } catch (error) {
        console.error('Error al iniciar sesion', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
} */