const Service = require('../../services');

const express = require('express');
const router = express.Router();

router.get('/list', async (req, res) => {
    try {
        const result = await Service.Temperatura.getContent();
        return res.status(200).json({ message: 'OK', data: result })
    } catch (error) {
        return res.status(500).send(returnError(error))
    }
});

router.get('/add/:value', async (req, res) => {
    try {
        const temp = req.params.value;
        const data = {temperatura: temp}
        const result = await Service.Temperatura.addContent(data);
        return res.status(200).json({ message: 'OK', data: result })
    } catch (error) {
        return res.status(500).send(returnError(error))
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await Service.Temperatura.addContent(req.body);
        return res.status(200).json({ message: 'OK', data: result })
    } catch (error) {
        return res.status(500).send(returnError(error))
    }
});

module.exports = router