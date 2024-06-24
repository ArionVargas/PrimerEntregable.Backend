import { Router } from 'express'
import {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} from '../controlers/ticketController/ticketController.js'

const ticketsRouter = Router()

ticketsRouter.post('/', createTicket)
ticketsRouter.get('/', getTickets)
ticketsRouter.get('/:id', getTicketById)
ticketsRouter.put('/:id', updateTicket)
ticketsRouter.delete('/:id', deleteTicket)

export default ticketsRouter
