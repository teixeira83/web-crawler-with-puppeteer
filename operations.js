const puppeteer = require('puppeteer');

class Operations {

    async logar (login, senha) {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://sistemas.campos.rj.gov.br/area-do-servidor/servidores/autenticar');

        await page.type('#servidor_matricula', login);
        await page.type('#servidor_password', senha);

        await page.evaluate(() => {
            document.querySelector('input[type=submit]').click();
        });

        await this.sleep(5000);
        await this.tirarScreenshot(page);
        
        const logado = await this.estouLogado(page);

        if (logado) {
            console.log('Login realizado com sucesso.')
        } else {
            console.log('Login ou senha invalidos.')
        }
    };

    async tirarScreenshot (page) {
        await page.screenshot({path: `to-dentro.png`});
    }

    async sleep(ms) {
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
        end = new Date().getTime();
    }
    }

    async fecharBrowser(browser) {
        await browser.close();
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

}

module.exports = new Operations();