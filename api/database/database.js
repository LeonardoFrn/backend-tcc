const knex = require('knex')(require('./index'))
exports.knex = knex

const ServicesTemperatura = require('../services/temperatura')

setTimeout(() => {
  ServicesTemperatura.getContent().then(result => {
    if (!result || !result.temperatura || (result.temperatura && !result.temperatura.length)) {
      console.log('PGSQL conectado!');
    }
  })
}, 1500)
