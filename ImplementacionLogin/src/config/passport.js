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
                     email ,
                     password :createHash(password)
                    }

                const result = await userModel.create(user)

                return done (null, result)

            } catch (error) {
                return done('Error registrando usuario :' + error)
            }
        }
    ))
}


export default initializePassport