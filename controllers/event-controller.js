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

    const findMatchesForEvent = (req, res) => {
        let eventId = req.params['eventId']
        eventService.findMatchesForEvent(eventId).then((result) => {
            res.send(result)
        });
    };

    const findEventAndMatches = (req, res) => {
        eventService.findEventAndMatches().then((result) => {
            res.send(result)
        });
    };

    app.get("/api/events", findAllEvents)
    app.get("/api/events/:eventId", findEventById)
    app.get("/api/events/:eventId/matches", findMatchesForEvent)
    app.get("/api/matchweek", findEventAndMatches)
}