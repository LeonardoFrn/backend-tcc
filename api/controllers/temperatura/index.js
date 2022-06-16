const Service = require('../../services');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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
        //Average MLX90640 Temperature: 23.5C (74.4F)
        let respArray = temp.split(' ');
        let respFinal = respArray[3].replace('C', '°C');
        const data = {temperatura: `${respFinal}`}
        const result = await Service.Temperatura.addContent(data);
        const numTemp = parseFloat(respArray[3].replace('C', ''));
        if(numTemp > 38){
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: `Alta temperatura detectada: ${respFinal}`,
                    to: `whatsapp:${process.env.PHONE_NUMBER}`
                })
                .then(message => console.log('SMS: ', message.sid));
        }
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