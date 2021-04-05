const eventService = require("../services/event-service")

module.exports = (app) => {

    const findAllEvents = (req, res) => {
        eventService.findAllEvents().then((result) => {
            res.send(result)
        });
    };

    const findEventById = (req, res) => {
        const eventId = parseInt(req.params['eventId'])
        eventService.findEventById(eventId).then((result) => {
            res.send(result)
        });
    };

    app.get("/api/events", findAllEvents)
    app.get("/api/events/:eventId", findEventById)
}