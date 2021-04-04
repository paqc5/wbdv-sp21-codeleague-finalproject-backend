const events = require("./events.json")

const findAllEvents = () => {
    return events
}

const findEventById = (eventId) => {
    return events.filter((event) => {
        return event.id === eventId
    })
}

module.exports = {
    findAllEvents, findEventById
}