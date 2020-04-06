require('dotenv').config();
const operations = require('./operations');
//lembrar de mudar
const funcionariosAtivos = require('./funcionarios-ativos'); 

async function rodar() {
    await operations.logar(process.env.SECRET_LOGIN, process.env.SECRET_PASSWORD);

    await operations.acessarContraCheque();
}

async function testarMatriculasRepetidas(){

    let inicioDaVarredura = 3691;
    
    for (; inicioDaVarredura < funcionariosAtivos.length; inicioDaVarredura++ ){
        console.log(`Iniciando tentativa da posição ${inicioDaVarredura}`);
        if ( funcionariosAtivos[inicioDaVarredura].matricula === process.env.SECRET_LOGIN){
            console.log('sou eu');
            await operations.logar(funcionariosAtivos[inicioDaVarredura].matricula, process.env.SECRET_PASSWORD);
        } else {
            await operations.logar(funcionariosAtivos[inicioDaVarredura].matricula, funcionariosAtivos[inicioDaVarredura].matricula);
        }
    }
}


// rodar();

testarMatriculasRepetidas();

