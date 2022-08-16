const express = require("express");//importando o módulo do express
const app = express();//criar uma instancia do express

//Estou configurando no Express a View Engine (renderizador html) que será utilizado
app.set('view engine', 'ejs');

//rotas

app.get("/", (req, res) =>{
    res.render("index");
});

//definindo a porta

app.listen(3000, () => {
    console.log("App rodando!")
});
