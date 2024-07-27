// auth.controller.js
import UsersDAO from '../services/dao/mongodb/usersDAO.js'
import CartDao from '../services/dao/mongodb/cartsDAO.js'
import { createHash, isValidPassword } from '../../utils.js'
import passport from 'passport'
import { generateJWToken } from '../../utils.js'

const usersDaoInstance = new UsersDAO()
const cartsDaoInstance = new CartDao()

export const registerUser = async (req, res, next) => {
    passport.authenticate('register', async (err, user, info) => {

        req.logger.debug('Iniciando registerUser')

        if (err) {

            req.logger.error(`Error en registro: ${err.message}`)
            return next(err)
        }
        if (!user) {

            req.logger.warning('Registro fallido: usuario no proporcionado')
            return res.status(400).send(info.message)
        }

        try {

            const cart = await cartsDaoInstance.addCart({ user: user._id, products: [] })
            user.cart.push(cart._id)
            await user.save()

            req.logger.info('Usuario registrado con éxito')
            return res.status(201).send('Usuario registrado con éxito')

        } catch (error) {

            req.logger.error(`Error registrando usuario: ${error.message}`)
            return res.status(500).send('Error registrando usuario: ' + error.message)
        }
    })(req, res, next)
}

export const loginUser = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {

        req.logger.debug('Inicio de loginUser')

        if (err) {
            req.logger.error(`Error en login: ${err.message}`)
            return next(err)
        }
        if (!user) {

            req.logger.warning('Login fallido: usuario no proporcionado')
            return res.status(401).send(info.message)
        }

        req.login(user, { session: false }, async (loginErr) => {
            if (loginErr) {
                return next(loginErr)
            }

            req.session.user = user

            let cart = await cartsDaoInstance.getCartByUserId(user._id)
            if (!cart) {
                cart = await cartsDaoInstance.newCart()  // Crear un nuevo carrito si no existe
               
                if (!mongoose.Types.ObjectId.isValid(cart._id)) {

                    req.logger.error('Error al crear el carrito')
                    return res.status(500).send('Error al crear el carrito')
                }
                user.cart = [cart._id]
                await user.save()
            } else {

                user.cart = [cart._id]
            }
            req.session.cartId = cart._id


            const accessToken = generateJWToken(user)
            res.cookie('jwtCookieToken', accessToken, {
                maxAge: 60000,
                httpOnly: true,
            })

            req.logger.info('Usuario logueado con éxito')
            return res.status(200).json({ status: 'success', user })
        })
    })(req, res, next)
}
