import Ticket from '../../models/modelsMongo/ticket.model.js'

class TicketsDAO {
    async createTicket(ticketData) {
        const ticket = new Ticket(ticketData)
        return await ticket.save()
    }

    async getTickets() {
        return await Ticket.find()
    }

    async getTicketById(id) {
        return await Ticket.findById(id)
    }

    async updateTicket(id, ticketData) {
        return await Ticket.findByIdAndUpdate(id, ticketData, { new: true })
    }

    async deleteTicket(id) {
        return await Ticket.findByIdAndDelete(id)
    }
}

export default TicketsDAO
