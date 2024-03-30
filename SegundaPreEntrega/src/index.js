import express from "express"
import { ProductManager } from "./productManager.js"
import { productsRouter } from "./routes/products.router.js"
import { cartsRouter } from "./routes/carts.router.js"
import { CartManager } from "./cartManager.js"
import __dirname from "../utils.js"
import handlebars from "express-handlebars"
import viewRouter from "./routes/views.router.js"
import { Server } from "socket.io"
import socketProducts from "./listeners/socketProducts.js"
import mongoose from "mongoose"
import usersRouter from "./routes/users.router.js"
import productsdbRouter from "./routes/productsdb.router.js"
import cartsdbRouter from "./routes/cartsdb.router.js"
import { register } from "./controllers/auth.controllers.js"
import cartsModel from "./models/carts.model.js"
import session from 'express-session'

const PORT = 8080
const app = express()

export const productManager = new ProductManager
export const cartManager = new CartManager

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/src/public"))

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/src/views")


app.use("/api/hbs", viewRouter)
app.use("/", viewRouter)

//products websokets
app.use("/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.use("/massages", viewRouter)

//MongoDB
app.use("/api/users", usersRouter)
app.use("/api/products", productsdbRouter)
app.use("/api/carts", cartsdbRouter)

app.use("/api/register", register)

const httpServer = app.listen(PORT, (req, res) => {
    console.log(`Server run on port: ${PORT}`)
})

const socketServer = new Server(httpServer)

socketProducts(socketServer)

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


const messages = [];
socketServer.on('connection', socket => {
    // Esto lo ve cualquier user que se conecte
    socketServer.emit('messageLogs', messages);



    // aqui vamos a recibir { user: user, message: catBox.value }
    socket.on("message", data => {
        messages.push(data)


        // enviamos un array de objetos ---> [{ user: "Juan", message: "Hola" }, { user: "Elias", message: "Como estas?" }]
        socketServer.emit('messageLogs', messages);
    });


    // hacemos un broadcast del nuevo usuario que se conecta al chat
    socket.on('userConnected', data => {
        console.log(data);
        socket.broadcast.emit('userConnected', data.user)
    })


    // Cuando desees cerrar la conexión con este cliente en particular:
    socket.on('closeChat', data => {
        if (data.close === "close")
            socket.disconnect();
    })


})