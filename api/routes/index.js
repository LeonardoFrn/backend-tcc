const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json({ type: 'application/json' }))

const temperaturaController = require('../controllers/temperatura');
app.use('/api/temperatura', temperaturaController);
