import TicketsDAO from '../../services/dao/mongodb/ticketDAO.js'
import { sendEmailWithTicket } from '../email.controller.js'

const ticketsDaoInstance = new TicketsDAO()

// Crear un nuevo Ticket
export const createTicket = async (req, res) => {

    req.logger.debug('Inicio de createTicket')

    try {
        const { amount, purchaser } = req.body
        const newTicket = await ticketsDaoInstance.createTicket({ amount, purchaser })
        await sendEmailWithTicket(purchaser, newTicket)

        req.logger.info('Creacion de ticket exitosa')
        res.status(201).json(newTicket)
    } catch (error) {

        req.logger.error(`Error al crear ticket: ${error.message}`)
        res.status(500).json({ message: error.message })
    }
}

// Obtener todos los Tickets
export const getTickets = async (req, res) => {

    req.logger.debug('Inicio de getTickets')
    try {
        const tickets = await ticketsDaoInstance.getTickets()

        req.logger.info('Obtencion de tickets exitosa')
        res.status(200).json(tickets)
    } catch (error) {

        req.logger.error(`Error al obtener tickets: ${error.message}`)
        res.status(500).json({ message: error.message })
    }
}

// Obtener un Ticket por ID
export const getTicketById = async (req, res) => {

    req.logger.debug('Inicio de getTicketById')
    try {
        const ticket = await ticketsDaoInstance.getTicketById(req.params.id)
        if (!ticket) {
            req.logger.warning(`Ticket no encontrado con id: ${req.params.id}`)
            return res.status(404).json({ message: 'Ticket no encontrado' })
        }

        req.logger.info('Otencion de ticket por Id exitoso')
        res.status(200).json(ticket)
    } catch (error) {

        req.logger.error(`Error al obtener ticket con id ${req.params.id}: ${error.message}`)
        res.status(500).json({ message: error.message })
    }
}

// Actualizar un Ticket
export const updateTicket = async (req, res) => {

    req.logger.debug('Inicio de updateTicket')
    try {
        const updatedTicket = await ticketsDaoInstance.updateTicket(req.params.id, req.body)
        if (!updatedTicket) {
            req.logger.warning(`Ticket no encontrado con id: ${req.params.id}`)
            return res.status(404).json({ message: 'Ticket no encontrado' })
        }

        req.logger.info('actualizacion de ticket exitoso')
        res.status(200).json(updatedTicket)
    } catch (error) {

        req.logger.error(`Error al actualizar ticket con id ${req.params.id}: ${error.message}`)
        res.status(500).json({ message: error.message })
    }
}

// Eliminar un Ticket
export const deleteTicket = async (req, res) => {

    req.logger.debug('Inicio de deleteTicket')
    try {
        const deletedTicket = await ticketsDaoInstance.deleteTicket(req.params.id)
        if (!deletedTicket) {
            req.logger.warn(`Ticket no encontrado con id: ${req.params.id}`)
            return res.status(404).json({ message: 'Ticket no encontrado' })
        }

        req.logger.info('Ticket eliminado con exito')
        res.status(200).json({ message: 'Ticket eliminado con éxito' })
    } catch (error) {

        req.logger.error(`Error al eliminar ticket con id ${req.params.id}: ${error.message}`)
        res.status(500).json({ message: error.message })
    }
}
