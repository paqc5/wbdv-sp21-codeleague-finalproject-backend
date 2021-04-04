const elementTypeService = require("../services/element_types/element-type-service")

module.exports = (app) => {
    const findAllTypes = (req, res) => {
        const types = elementTypeService.findAllTypes()
        res.send(types)
    }
    const findTypeById = (req, res) => {
        const typeId = parseInt(req.params['typeId'])
        const type = elementTypeService.findTypeById(typeId)
        res.send(type)
    }

    app.get("/api/types", findAllTypes)
    app.get("/api/types/:typeId", findTypeById)
}