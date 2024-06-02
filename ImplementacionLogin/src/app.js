import express from "express"
import __dirname from "../utils.js"
import exphbs  from "express-handlebars"
import Handlebars from "handlebars"
import usersRouter from "./routes/users.router.js"
import productsdbRouter from "./routes/productsdb.router.js"
import cartsdbRouter from "./routes/cartsdb.router.js"
import session from "express-session"
import router from './routes/views.router.js'
import authRouter from './routes/auth.router.js'
import passport from "passport"
import initializePassport from "./config/passport.js"
import config from './config/configServer.js'
import MongoSingleton from "./config/mongodbSingleton.js"
import cookieParser from "cookie-parser"


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
        secret:'secretCoder',
        resave:true,
        saveUninitialized:true
    }
))



//MongoDB
app.use("/api/users", usersRouter)
app.use("/api/products", productsdbRouter)
app.use("/api/carts", cartsdbRouter)
app.use("/api",authRouter)
app.use("/", router)

const PORT = config.port
console.log(PORT);

app.listen(PORT, (req, res) => {
    console.log(`Server run on port: ${PORT}`)

    console.log(config)

})


// Singleton 

const mongoInstance = async () =>{
    try {
        await MongoSingleton.getInstance()
    } catch (error) {
        console.error(error)
    }
}

mongoInstance()

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


