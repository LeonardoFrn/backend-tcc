//importacao das bibliotecas
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const https = require('https').Server(app);
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

require('dotenv-flow').config({ default_node_env: 'development' });

const port = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());

const sessionIO = {}
io.on('connection', (socket) => {
    const { user_id } = socket.handshake.query
    sessionIO[user_id] = socket.id
    console.log('Socket ON!!!!!!', sessionIO)
    socket.emit('session_io', socket.id)
});

app.use(bodyParser.json({ type: 'application/json' }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    
    req.io = io
    req.sessionIO = sessionIO
    
    next()
});

//ROTAS
const Controller = require('./api/controllers');
app.use('/api/temperatura', Controller.temperaturaController);

let conexao = http.listen(port, () => {
    console.log(`🚀  Server conectado em http://localhost:${port}`);
    //reader;
});
conexao.setTimeout(300000);