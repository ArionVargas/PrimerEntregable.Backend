import TicketsDAO from '../../services/dao/mongodb/ticketDAO.js'
import { sendEmailWithTicket } from '../email.controller.js'

const ticketsDaoInstance = new TicketsDAO()

// Crear un nuevo Ticket
export const createTicket = async (req, res) => {
    try {
        const { amount, purchaser } = req.body
        const newTicket = await ticketsDaoInstance.createTicket({ amount, purchaser })
        await sendEmailWithTicket(purchaser, newTicket)
        res.status(201).json(newTicket)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Obtener todos los Tickets
export const getTickets = async (req, res) => {
    try {
        const tickets = await ticketsDaoInstance.getTickets()
        res.status(200).json(tickets)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Obtener un Ticket por ID
export const getTicketById = async (req, res) => {
    try {
        const ticket = await ticketsDaoInstance.getTicketById(req.params.id)
        if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' })
        res.status(200).json(ticket)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Actualizar un Ticket
export const updateTicket = async (req, res) => {
    try {
        const updatedTicket = await ticketsDaoInstance.updateTicket(req.params.id, req.body)
        if (!updatedTicket) return res.status(404).json({ message: 'Ticket no encontrado' })
        res.status(200).json(updatedTicket)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Eliminar un Ticket
export const deleteTicket = async (req, res) => {
    try {
        const deletedTicket = await ticketsDaoInstance.deleteTicket(req.params.id)
        if (!deletedTicket) return res.status(404).json({ message: 'Ticket no encontrado' })
        res.status(200).json({ message: 'Ticket eliminado con éxito' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
