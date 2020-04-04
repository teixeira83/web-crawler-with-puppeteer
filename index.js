require('dotenv').config();
const operations = require('./operations');

async function rodar() {
    await operations.logar(process.env.SECRET_LOGIN, process.env.SECRET_PASSWORD);

    await operations.fecharPaginas();

    await operations.fecharBrowsers();
}

async function testarSenhasRepetidas(){

}


rodar();

