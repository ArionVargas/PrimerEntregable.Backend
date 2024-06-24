import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const collectionsTickets = 'tickets'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: () => uuidv4(),
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})

const Ticket = mongoose.model(collectionsTickets, ticketSchema)
export default Ticket
