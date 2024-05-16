import express from "express"
import __dirname from "../utils.js"
import handlebars from "express-handlebars"
/* import mongoose from "mongoose" */
import usersRouter from "./routes/users.router.js"
import productsdbRouter from "./routes/productsdb.router.js"
import cartsdbRouter from "./routes/cartsdb.router.js"
/* import cartsModel from "./models/carts.model.js" */
import session from "express-session"
import router from './routes/views.router.js'
import authRouter from './routes/auth.router.js'
import passport from "passport"
import initializePassport from "./config/passport.js"
import config from './config/configServer.js'
import MongoSingleton from "./config/mongodbSingleton.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/src/public"))

//handlebars
app.engine("handlebars", handlebars.engine())
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


//Db llamada directa

/* const URL_mongo = "mongodb+srv://arionvargas07:YmcnUi3N3c5JyqAh@cluster2.nzze0xu.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster2"

const connectMongoDB = async () => {
    try {
        mongoose.connect(URL_mongo)
        console.log('conectado correctamente a la db solicitada')
    } catch (error) {
        console.error('No se pudo conectar a la bd usando MOngoose:' + error)
        process.exit()
    }


    //populate
    cartsModel.find().populate("products.product_id")

} */

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

/* connectMongoDB() */
