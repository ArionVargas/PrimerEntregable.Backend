
import { ProductManager } from "../productManager.js"
import __dirname from "../../utils.js"


const pm = new ProductManager(__dirname + "/src/products.json")

const socketProducts = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("client connected with ID:", socket.id)
        const listProducts = await pm.getProducts()
        socketServer.emit("sendProducts", listProducts)

        socket.on("addProduct", async (obj) => {
            await pm.addProduct(obj)
            const listProducts = await pm.getProducts()
            socketServer.emit("sendProducts", listProducts)
        })

        socket.on("deleteProduct", async (id) => {
            await pm.deleteProductById(id)
            const listProducts = await pm.getProducts()
            socketServer.emit("sendProducts", listProducts)
        })
    })
}

export default socketProducts

