import mongoose from "mongoose"
import configServer from "./configServer.js"

export default class MongoSingleton {
    static #instance

    constructor(){
        this.#connectMongoDB()
    }

    static getInstance(){
        if (!this.#instance) {
            this.#instance = new MongoSingleton()
        }
        return this.#instance
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(configServer.mongoURL)
            console.log('Conexión a la base de datos MongoDB establecida en MongoSingleton')
        } catch (error) {
            console.error("No se pudo conectar a la base de datos en MongoSingleton:", error)
            process.exit(1)
        }
    }
}