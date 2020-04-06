require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');
class Operations {

    async logar (login, senha) {
        let url = process.env.URL_LOGIN;

        let funcionariosLogados = [];

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url).catch((err) => console.log(`\n\n\n
        **************************
            Erro ao tentar acessar página...
        **************************\n\n\n`));
        this.sleep(400);
        await page.type('#servidor_matricula', login);
        await page.type('#servidor_password', senha);

        await page.click('input[type=submit]');
        
        this.sleep(1500);

        const logado = await this.estouLogado(page)
            .catch((err) => console.log(`\n\n\n
            **************************
                Erro ao verificar se estou logado...
            **************************\n\n\n`));

        if (await logado) {
            console.log(`Login da matricula ${login} realizado com sucesso.`);
            funcionariosLogados.push(login);
            await this.salvarArquivo(funcionariosLogados)
        } else {
            console.log(`Senha da matricula ${login} invalida.`);
        }

        browser.close();
    };

    async tirarScreenshot (page, nomeArquivo) {
        await page.screenshot({path: `${nomeArquivo}.png`});
    }

    async sleep(ms) {
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
            end = new Date().getTime();
    }
}

    async fecharBrowsers() {
        const browser = puppeteer.launch();
        // const browsers = await (await browser).targets();
        
        // console.log(browsers);
        // console.log(`tamanho do array de browser = ${browsers.length}`);
        // (await browser).close();

        // browsers = await (await browser).targets();
        // console.log(`tamanho do array de browser = ${browsers.length}`);
    }

    async fecharPaginas() {
        const tempBrowser = puppeteer.launch();

        const pages = await (await tempBrowser).pages();

        for(let p of pages) {
            p.close();
        }

        console.log('Paginas fechadas com sucesso');
    }

    /*
    **
    Verifica quantos <ul> tem na página.
    Foi o único padrão encontrado para saber se está ou não logado.
    Retorna true caso a página tenha 3 <ul> </ul>
    Retorna false caso a página tenha 2 <ul> </ul>
    **
    */
    async estouLogado (page) {
        const ul = (await page.$$('ul')).length;

        return ul == 3 ? true : false;
    }

    async acessarContraCheque () {
        let url = 'https://sistemas.campos.rj.gov.br/area-do-servidor/contracheques/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);   
        
        await page.$('#year', '2020');
        await page.$('#data', '01/2020');

        await this.sleep(5000);
        await this.tirarScreenshot(page, 'select');
    }

    async salvarArquivo(array) {
        fs.writeFile('./arquivo', JSON.stringify(array), function(erro) {
            if(erro) {
                throw erro;
            } else {
                console.log(`Funcionario salvo corretamente...`);
            }
            
            
        }); 
    }

}

module.exports = new Operations();