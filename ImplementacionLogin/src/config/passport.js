import passport from "passport"
import passportLocal from "passport-local"
import userModel from "../models/users.model.js"
import { createHash, isValidPassword } from "../../utils.js"
import GitHubStrategy from 'passport-github2'

const localStrategy = passportLocal.Strategy

const initializePassport = () => {

    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.b42560ee6348422e',
            clientSecret: '5edb99fd472cfd85d1e0699c7ec137d422d4c3ae',
            callbackUrl: 'http://localhost:8080/api/githubcallback'
        }, async (accessToken, refreshToken, profile, done) => {

            console.log("perfil obtenido de github en passport js")
            console.log(profile)
            try {
                const user = await userModel.findOne({ email: profile._json.email })
                console.log('usuario encontrado para login ')
                console.log(user)

                if (!user) {

                    let newUser = {
                        firstName: profile._json.name,
                        lastName: '',
                        email: profile._json.email,
                        password: ''
                    }

                    const result = await userModel.create(newUser)
                    return done(null, result)
                } else {
                    return done(null, user)
                }
            } catch (error) {
                return done(error)
            }

        }
    ))

    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
            try {
                const { firstName, lastName, email } = req.body
                const exist = await userModel.findOne({ email })

                if (exist) {
                    return done(null, false)
                }

                const user = {
                    firstName,
                    lastName,
                    email,
                    password: createHash(password)
                }

                const result = await userModel.create(user)

                return done(null, result)

            } catch (error) {
                return done('Error registrando usuario :' + error)
            }
        }
    ))

    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                if (!user) {
                    console.warn('invalid credentials for user :' + username)
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) {

                    return done(null, false)
                }

                return done(null, user)

            } catch (error) {
                return done(error)
            }
        }

    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            console.log("error al deserializar user" + error)
        }
    })
}




export default initializePassport