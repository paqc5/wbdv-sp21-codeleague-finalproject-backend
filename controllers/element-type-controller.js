const elementTypeService = require("../services/element-type-service")

module.exports = (app) => {

    const findAllTypes = (req, res) => {
        elementTypeService.findAllTypes().then((result) => {
            res.send(result)
        });
    };

    const findTypeById = (req, res) => {
        const typeId = parseInt(req.params['typeId'])
        elementTypeService.findTypeById(typeId).then((result) => {
            res.send(result)
        });
    };

    app.get("/api/types", findAllTypes)
    app.get("/api/types/:typeId", findTypeById)
}