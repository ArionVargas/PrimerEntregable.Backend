import mongoose from "mongoose"



const userCollection = 'users'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    email: String,
    password: String,
    carts: {
        type: [
            {
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'carts'
                }

            }
        ], default:[]
    }
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel