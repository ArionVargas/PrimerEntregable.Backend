import mongoose from "mongoose"

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
},
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
})

const cartsModel = mongoose.model(cartCollection, cartSchema)

export default cartsModel
