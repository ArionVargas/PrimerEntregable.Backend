import passport from "passport"
import passportLocal from "passport-local"
import userModel from "../models/users.model.js"
import { createHash, isValidPassword } from "../../utils.js"

const localStrategy = passportLocal.Strategy

const initializePassport = () => {

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

                if (!isValidPassword(user,password)) {
                    /* return res.status(401).send({ status: "false", error: "Incorrect credentials" }) */
                return done(null,false)
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