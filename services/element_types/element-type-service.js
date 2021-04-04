const elementTypes = require("./element-types.json")

const findAllTypes = () => {
    return elementTypes
}

const findTypeById = (typeId) => {
    return elementTypes.filter((type) => {
        return type.id === typeId
    })
}

module.exports = {
    findAllTypes, findTypeById
}