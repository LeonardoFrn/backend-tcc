const Service = require('../../services');
//SID da conta gerado dentro do painel da Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
//token da conta gerado dentro do painel da Twilio
const authToken = process.env.TWILIO_AUTH_TOKEN;
//biblioteca da api da Twilio para fazer o envio das mensagens para o whatsapp
const client = require('twilio')(accountSid, authToken);
//O Express é um framework incrível e possui diversas características que facilitam o desenvolvimento
const express = require('express');
const router = express.Router();

//rota para exibir a lista de temperaturas
router.get('/list', async (req, res) => {
    try {
        const result = await Service.Temperatura.getContent();
        return res.status(200).json({ message: 'OK', data: result })
    } catch (error) {
        return res.status(500).send(returnError(error))
    }
});

//rota para adicionar a temperatura
router.get('/add/:value', async (req, res) => {
    try {
        const temp = req.params.value;
        //Resposta do Raspberry: Average MLX90640 Temperature: 23.5C (74.4F)
        //fazendo o split para coletar somente o valor da temperatura
        let respArray = temp.split(' ');
        //pegando somente o valor da temperatura e adicionando a unidade de medida
        let respFinal = respArray[3].replace('C', '°C');
        //contrucao do data para gravacao da temperatura
        const data = {temperatura: `${respFinal}`}
        //chamada para gravar os dados no banco de dados
        const result = await Service.Temperatura.addContent(data);
        //convertendo o valor da temperatura para float para fazer a comparacao da temperatura
        const numTemp = parseFloat(respArray[3].replace('C', ''));
        //se a temperatura for maior que 38 grasu Celsius mandamos uma mensagem no whatsapp cadastrado no arquivo .env
        if(numTemp > 38){
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',//numero fornecido pela plataforma da Twilio
                    body: `Alta temperatura detectada: ${respFinal}`,//mensagem com a temperatura coletada
                    to: `whatsapp:${process.env.PHONE_NUMBER}`//numero do telefone cadastrado no arquivo .env
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