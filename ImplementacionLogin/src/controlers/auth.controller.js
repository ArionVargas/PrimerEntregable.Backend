// auth.controller.js
import UsersDAO from '../services/dao/mongodb/usersDAO.js'
import CartDao from '../services/dao/mongodb/cartsDAO.js'
import { createHash, isValidPassword } from '../../utils.js'
import passport from 'passport'
import {generateJWToken} from '../../utils.js'

const usersDaoInstance = new UsersDAO()
const cartsDaoInstance = new CartDao()

export const registerUser = async (req, res, next) => {
    passport.authenticate('register', async (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(400).send(info.message)
        }

        try {
            const cart = await cartsDaoInstance.addCart({ user: user._id, products: [] })
            user.cart.push(cart._id)
            await user.save()

            return res.status(201).send('Usuario registrado con éxito')
        } catch (error) {
            return res.status(500).send('Error registrando usuario: ' + error.message)
        }
    })(req, res, next)
}

export const loginUser = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
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
                    return res.status(500).send('Error al crear el carrito')
                }
                user.cart = [cart._id]
                await user.save()
            } else {
                // Asegúrate de que user.cart sea un array
                user.cart = [cart._id]
            }
            req.session.cartId = cart._id


            const accessToken = generateJWToken(user)
            res.cookie('jwtCookieToken', accessToken, {
                maxAge: 60000,
                httpOnly: true,
            })
            return res.status(200).json({ status: 'success', user })
        })
    })(req, res, next)
}
