const express = require("express");//importando o módulo do express
const app = express();//criar uma instancia do express

//Estou configurando no Express a View Engine (renderizador html) que será utilizado
app.set('view engine', 'ejs');

//rotas
//rotas com requisição de parametros vinda do usuário
app.get("/:nome/:langpro1/:langpro2", (req, res) =>{
    var nome = req.params.nome;
    var langprog1 = req.params.langpro1;//requisição de parametro 
    var langprog2 = req.params.langpro2;//requisição de parametro 
    
    res.render("index",{
        nome:nome,//nome recebe a variável nome
        langprog1:langprog1,//langprog1 recebe a variável langprog1
        langprog2:langprog2,//langprog2 recebe a variável langprog2
        empresa:"T-pro",
        funcionarios:2
    });
});

//definindo a porta

app.listen(3000, () => {
    console.log("App rodando!")
});
