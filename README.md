# backend-tcc
backend tcc coleta de temperatura
# verificar a instalação do Node na máquina
https://nodejs.org/en/download/
# inicialização do projeto
yarn install ou npm install
# criar o arquivo .env com os dados
DB_HOST= host banco de dados
DB_USER=usuario do banco de dados
DB_PASSWORD=senha do banco de dados
DB_DATABASE= nome do database do banco de dados
PORT=5432
HOST=127.0.0.1
TWILIO_AUTH_TOKEN= token coletado do painel da plataforma da Twilio
TWILIO_ACCOUNT_SID= SID coletado do painel da plataforma da Twilio
PHONE_NUMBER= numero de telefone ao qual será enviado a mensagem de alerta, exemplo(+5599999999999)

# Testar as dados de conexão
yarn start ou npm run start