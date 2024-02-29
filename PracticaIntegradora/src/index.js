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


const PORT = 8080
const app = express()

export const productManager = new ProductManager
export const cartManager = new CartManager

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/src/public"))

app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/src/views")


app.use("/api/hbs", viewRouter)
app.use("/", viewRouter)

app.use('/api/users',usersRouter)

/* app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter) */

const httpServer = app.listen(PORT, (req, res) => {
    console.log(`Server run on port: ${PORT}`)
})

const socketServer = new Server(httpServer)

socketProducts(socketServer)

const URL_mongo = "mongodb+srv://arionvargas07:Mqbh042RKU88fmyP@cluster0.z9mwnyv.mongodb.net/usersPrueba"




/* socketServer.on("connection", async (socket) => {
    const products = await productManager.getProducts()


    socket.on("mensaje", products => {
        console.log("los productos son:" + products)
    })

    socket.emit("products", products)
}) */