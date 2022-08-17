# Documentation

Primeiramente criei um projeto NodeJs, criando uma pasta no meu computador, abrindo o terminal e acessando essa pasta dei o comando para criar o projeto Node:

~~~
npm init
~~~



Em seguida precisaremos instalar o ExpressJs, uma biblioteca que nos ajudará a criar nosso servidor node, ainda dentro da pasta do projeto rodei o comando:
~~~
npm install express --save
~~~


Precisaremos ainda de um renderizador de html, então instalaremos outra dependencia para nosso projeto, no caso será o EJS, ele será responsável por desenhar o html no output do projeto, então ainda dentro da pasta do projeto rodei o comando:

~~~~
npm install ejs --save
~~~~

# CONFIGURANDO O EXPRESS NO PROJETO

Para isso vamos criar dentro da pasta do nosso projeto um arquivo com extenção js, ficará assim: index.js.
Dentro do arquivo index iniciaremos a configuração do nosso servidor express.Primeiramente vamos importar o módulo do express. 

~~~~javascript
const express = require("express");//importando o módulo do express
~~~~

Em seguida vamos instanciar o express no projeto para podermos configurar rotas

~~~~javascript
const app = express();//criar uma instancia do express
~~~~

Agora vamos criar nossa rota inicial, essa rota inicial aponta para a raiz do nosso projeto, utilizando os métodos HTTP´s ( GET, POST, PUT, DELETE). A comunicação via protocolo HTTP possui uma REQUISIÇÃO e uma RESPOSTA(req e res), nesse exemplo inicial, colocaremos manualmente uma resposta ("Bem Vindo!"), para isso utilizaremos o a instrução (res.send()), que basicamente significa "enviar como resposta o que está dentro de ()"

~~~~javascript
app.get("/", (req, res) =>{
    res.send("Bem Vindo!");
});
~~~~

Agora que definimos nossa rota inicial, vamos definir em qual porta iremos rodar nossa aplicação. Nesse caso rodaremos a aplicação na Porta 3000, você pode utilizar a 9090, 8080 etc. O que você deve ter em mente é que nenhuma outra aplicação deve estar rodando na porta que você definir aqui, pois senão irá conflitar a aplicação. Dentro desse método colocaremos um "console.log" com uma mensagem apenas pra sabermos que a aplicação está rodando normalmente.

~~~~javascript
//definindo a porta

app.listen(3000, () => {
    console.log("App rodando!")
})
~~~~

# INSTALANDO NODEMON

Para testarmos nossa aplicação sem precisar estar recarregando o servidor a cada alteração, iremos instalar o "nodemon". Utilizaremos apenas em ambiente de desenvolvimento, por isso utilizaremos a flag "--save-dev"

~~~~
npm install nodemon --save-dev
~~~~

Após a instalação do Nodemon, basta utilizar o terminal com o acesso dentro da pasta do projeto e rodar o comando:

~~~~terminal
nodemon index.js
~~~~

Deve aparecer a mensagem "App rodando!" no terminal, em seguida abriremos o navegador e acessaremos o projeto com o endereço "http://localhost:3000". Se tudo tiver correto, aparecerá no navegador a mensagem " Bem Vindo!". E assim finalizamos a configuração inicial do express no projeto.

# CONFIGURANDO O EJS NO PROJETO

Para configurar o EJS no nosso projeto, vamos dentro do nosso arquivo index e antes de nossas rotas iremos acrescentar o seguinte código:

~~~~javascript
//Estou configurando no Express a View Engine (renderizador html) que será utilizado
app.set('view engine', 'ejs');
~~~~

E pronto! concluimos a configuração do EJS no projeto.

Agora vem a pergunta:

Onde devo salvar meus arquivos html?

O Express trabalha da seguinte forma:

* Criamos uma pasta obrigatoriamente com o nome "views" na raiz do projeto;
* Salvaremos todas as nossas páginas HTML dentro dessa pasta.

Porém, estamos trabalhando com uma View Engine, ou seja, não serão páginas HTML básicas, logo elas não terão a extensão ".html", mas sim a extensão ".ejs". Então na hora de criar suas páginas utilize essa segunda extensão.

## CRIANDO PÁGINAS HTML COM EJS

Para dar inicio na criação de nossas páginas html com EJS, primeiramente precisaremos fazer uma mudança no nosso arquivo **index.js**.

Na nossa rota principal, utilizamos o comando **.send**. Agora utilizaremos o comando **.render**. Dessa forma estamos indicando para o Express renderizar algo.

O código antes estava dessa maneira:

~~~~javascript
const express = require("express");//importando o módulo do express
const app = express();//criar uma instancia do express

//Estou configurando no Express a View Engine (renderizador html) que será utilizado
app.set('view engine', 'ejs');

//rotas

app.get("/", (req, res) =>{
    res.send("Bem Vindo!");
});

//definindo a porta

app.listen(3000, () => {
    console.log("App rodando!")
});
~~~~

Agora alteraremos o código na parte das rotas e ficará assim:


~~~~javascript
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
~~~~

Dessa forma estaremos indicando para o Express renderizar o arquivo **index** que se encontra dentro da pasta **views**. Este comando procurará automáticamente dentro desta pasta **views**, por isso certifique-se que ela está escrita igual a este exemplo, pois se tiver escrito com algum erro o Express não encontrará o arquivo indicado entre chaves, nesse caso **index**.

# EXIBINDO VARIÁVEIS NO HTML COM EXPRESS E EJS

Primeiramente devemos ir nas nossa rotas e definir as nossas variáveis, o seu código nas rotas deve estar dessa forma:

~~~~javascript
//rotas

app.get("/", (req, res) =>{
    res.render("index");
});
~~~~

Então acima do nosso método render definimos nossas variaveis, como exemplo vou colocar o meu nome e minhas linguagens de programação favoritas:

~~~~javascript
//rotas

app.get("/", (req, res) =>{
    var nome = "Rui Frank";
    var langprog1 = "javascript";
    var langprog2 = "php";
    
    res.render("index");
});
~~~~

Agora para renderizarmos essas informações no HTML através do EJS, devemos acrescentar uma virgula após o parâmetro que define o arquivo de renderização principal dessa rota nesse caso o **index**  em seguida abrir chaves e definir os dados que serão utilizados na renderização da página HTML. Nesse exemplo, irei colocar as três variáveis e mais alguns valores manualmente, que ficará dessa forma:

~~~~javascript
//rotas

app.get("/", (req, res) =>{
    var nome = "Rui Frank";
    var langprog1 = "javascript";
    var langprog2 = "php";
    
    res.render("index",{
        nome:nome,//nome recebe a variável nome
        langprog1:langprog1,//langprog1 recebe a variável langprog1
        langprog2:langprog2,//langprog2 recebe a variável langprog2
        empresa:"T-pro",
        funcionarios:2
    });
});
~~~~

Dessa forma você define os valores que poderão ser exibidos na renderização.Mas ainda precisamos definir dentro do arquivo EJS onde esses valores serão renderizados no arquivo EJS que é o mesmo arquivo onde criamos nossas páginas HTML com EJS. Para definir utilizamos a tag **<%= %>** para exibir valores de uma variável.

Então iremos acessar nosso arquivo **index.ejs** que deve estar da seguinte forma:

~~~~html
<! -- arquivo index.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Suporte Perguntas e Respostas</title>
</head>
<body>
    <h1>Seja Bem Vindo!</h1>
    <p>Este site está sendo desenvolvido para ser um tipo de fórum onde se poderão fazer e responder perguntas referentes a um sistema que dou suporte</p>
</body>
</html>
~~~~

Então iremos acrescentar as tags especiais do EJS para podermos acessar as variáveis definidas dentro do nosso Servidor Express nas rotas do projeto. Ficará da seguinte forma.

~~~~html
<! -- arquivo index.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Suporte Perguntas e Respostas</title>
</head>
<body>
    <h1>Seja Bem Vindo!</h1>
    <p>Este site está sendo desenvolvido para ser um tipo de fórum onde se poderão fazer e responder perguntas referentes a um sistema que dou suporte</p>

    <%= nome %>
    <%= langprog1 %>
    <%= langprog2 %>
    <%= empresa %>
    <%= funcionarios %>
</body>
</html>
~~~~

Para ver o resultado desta codificação basta acessar a rota do projeto, definida na parte do método **listen** no Servidor Express no arquivo **index.js**, que nesse caso ficará: http://localhost:3000

[image]C:\www\SuporteSistema\prints\Capturar.PNG

