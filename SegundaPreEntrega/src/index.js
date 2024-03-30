import express from "express"
import __dirname from "../utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import mongoose from "mongoose"
import usersRouter from "./routes/users.router.js"
import productsdbRouter from "./routes/productsdb.router.js"
import cartsdbRouter from "./routes/cartsdb.router.js"
import { register } from "./controllers/auth.controllers.js"
import cartsModel from "./models/carts.model.js"

const PORT = 8080
const app = express()

/* export const productManager = new ProductManager */
/* export const cartManager = new CartManager */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/src/public"))

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/src/views")


//MongoDB
app.use("/api/users", usersRouter)
app.use("/api/products", productsdbRouter)
app.use("/api/carts", cartsdbRouter)

app.use("/api/register", register)

const httpServer = app.listen(PORT, (req, res) => {
    console.log(`Server run on port: ${PORT}`)
})


const URL_mongo = "mongodb+srv://arionvargas07:YmcnUi3N3c5JyqAh@cluster2.nzze0xu.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster2"

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

}

connectMongoDB()
