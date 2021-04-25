const axios = require('axios');
const configs = require('./api-configs');

const findAllTypes = () => {
  return axios(configs.baseConfig).then((res) => {
    return res.data.element_types;
  });
};

const findTypeById = (typeId) => {
  return findAllTypes().then((res) => res.filter((type) => type.id === typeId));
};

module.exports = {
  findAllTypes,
  findTypeById,
};
