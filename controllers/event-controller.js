const eventService = require("../services/events/event-service")

module.exports = (app) => {
    const findAllEvents = (req, res) => {
        const events = eventService.findAllEvents()
        res.send(events)
    }
    const findEventById = (req, res) => {
        const eventId = parseInt(req.params['eventId'])
        const event = eventService.findEventById(eventId)
        res.send(event)
    }

    app.get("/api/events", findAllEvents)
    app.get("/api/events/:eventId", findEventById)
}