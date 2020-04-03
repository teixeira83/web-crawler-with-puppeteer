require('dotenv').config();
const operations = require('./operations');

async function rodar() {
    operations.logar(process.env.SECRET_LOGIN, process.env.SECRET_PASSWORD);
}

rodar();