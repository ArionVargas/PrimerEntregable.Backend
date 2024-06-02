import { fileURLToPath } from "url"
import { dirname } from "path"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import passport from "passport"

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
/* export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password) */
export const isValidPassword = (user, password) => {
    console.log("Comparando contraseñas en isValidPassword:");
    console.log("Password entrante:", password);
    console.log("Password en la base de datos:", user.password);
    const isValid = bcrypt.compareSync(password, user.password);
    console.log("¿Las contraseñas coinciden?", isValid ? "Sí" : "No");
    return isValid;
}

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

export const PRIVATE_KEY = "privatekeyJWT"

export const generateJWToken = (user)=>{
    return jwt.sign({user},PRIVATE_KEY,{expiresIn:'1h'})
}

export const authToken = (req,res,next) =>{
    const authHeader = req.headers.authorization
    console.log('Token en utils')
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).send({error:'user no autorizado'})
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(token,PRIVATE_KEY,(error,credentials)=>{
        if (error) return res.status(403).send({error:'token invalido en utils'})

        req.user = credentials.user
        console.log(req.user)
        next()
    })
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        console.log("Entrando a llamar strategy: ")
        console.log(strategy)
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err)
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }
            console.log("Usuario obtenido del strategy: ")
            console.log(user)
            req.user = user
            next()
        })(req, res, next)
    }
}

export default __dirname