const express = require("express");//importando o módulo do express
const app = express();//criar uma instancia do express

//Estou configurando no Express a View Engine (renderizador html) que será utilizado
app.set('view engine', 'ejs');

//rotas

app.get("/", (req, res) =>{
    var nome = "Rui Frank";
    var langprog1 = "javascript";
    var langprog2 = "php";

    res.render("index",{
        nome:nome,
        langprog1:langprog1,
        langprog2:langprog2,
        empresa:"T-pro",
        funcionarios:2
    });
});

//definindo a porta

app.listen(3000, () => {
    console.log("App rodando!")
});
