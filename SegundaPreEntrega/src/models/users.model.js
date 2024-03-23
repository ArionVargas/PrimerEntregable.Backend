import mongoose from "mongoose"



const userCollection = 'usuarios'

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartsModel'
    }
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel