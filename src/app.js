import express from "express"
import __dirname from "../utils.js"
import exphbs from "express-handlebars"
import Handlebars from "handlebars"
import usersRouter from "./routes/users.router.js"
import productsdbRouter from "./routes/productsdb.router.js"
import cartsdbRouter from "./routes/cartsdb.router.js"
import session from "express-session"
import router from './routes/views.router.js'
import authRouter from './routes/auth.router.js'
import passport from "passport"
import initializePassport from "./controllers/passport.js"
import config from './config/configServer.js'
import MongoSingleton from "./config/mongodbSingleton.js"
import cookieParser from "cookie-parser"
import emailRouter from './routes/email.router.js'
import smsRouter from './routes/sms.router.js'
import ticketsRouter from "./routes/ticket.router.js"
import { addLogger } from './config/logger/loggerCustom.js'
import loggerTestRouter from "./routes/loggerTest.router.js"
import { cpus } from "os"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUIExpress from "swagger-ui-express"

import cluster from 'cluster'
import performanceRouter from "./routes/performanceTest.router.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('privatekeyJWT'))
app.use(express.static(__dirname + "/src/public"))

let hbs = exphbs.create({
    handlebars: Handlebars,
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
});



//handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars")
app.set("views", __dirname + "/src/views")

//session
app.use(session(
    {
        secret: 'secretCoder',
        resave: true,
        saveUninitialized: true
    }
))

app.use(addLogger)

//swagger
const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:'Documentacion de API Ecommerce',
            description:'Documentacion para uso de swagger'
        }
    },
    apis:['src/docs/**/*.yaml']
}

const specs = swaggerJSDoc(swaggerOptions)

app.use("/apidocs",swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

//MongoDB
app.use("/api/users", usersRouter)
app.use("/api/products", productsdbRouter)
app.use("/api/carts", cartsdbRouter)
app.use("/api", authRouter)
app.use("/api/tickets", ticketsRouter)
app.use("/", router)
app.use("/api/email", emailRouter)
app.use('/api/sms', smsRouter)
app.use('/loggerTest', loggerTestRouter)

app.use('/api',performanceRouter)

/* const PORT = config.port

app.listen(PORT, (req, res) => {
    console.log(`Server run on port: ${PORT}`)

})


// Singleton 

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance()
    } catch (error) {
        console.error(error)
    }
}

mongoInstance()
 */
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


console.log(cluster.isPrimary);

if (cluster.isPrimary) {
    console.log('soy un proceso primario y voy a delegar a un fork');
    const numeroProcess = cpus().length
    for (let i = 0; i < numeroProcess - 1; i++) {
        cluster.fork()
    }
}else{
    console.log('soy un worker');
    console.log(process.pid);
    const PORT = config.port

app.listen(PORT, (req, res) => {
    console.log(`Server run on port: ${PORT}`)

})


// Singleton 

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance()
    } catch (error) {
        console.error(error)
    }
}

mongoInstance()

}