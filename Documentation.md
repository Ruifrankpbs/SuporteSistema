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

Agora para renderizarmos essas informações no HTML através do EJS, devemos acrescentar uma virgula após o parâmetro que define o arquivo de renderização principal dessa rota, nesse caso o **index**,  em seguida abrir chaves e definir os dados que serão utilizados na renderização da página HTML. Nesse exemplo, irei colocar as três variáveis e mais alguns valores manualmente, que ficará dessa forma:

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



# VALORES DE PARÂMETROS OBTIDOS DO USUÁRIO

Podemos realizar requisição de informações direto do usuário através do **req.params.NOME_DO_PARAMETRO** inserido no lugar no valor da variável no arquivo **index.js** e devemos acrescentar esses parâmetros na rota da página que deseja fazer essa requisição desse parâmetros. Para isso utilize **/:NOME_DO_PARAMETRO**.

Nosso código nas rotas em **index.js** estava assim:

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

Agora com o **req.params.NOME_DO_PARAMETRO** e os parâmetros na rota **/:NOME_DO_PARAMETRO**, nosso código das rotas em **index.js** ficará assim:

~~~~javascript
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
~~~~
O resultado será o seguinte:

<img src = "img\utilizando_req_params_express.png">

Lembrando que você deve colocar na URL os valores requisitados, nesse exemplo acima eu coloquei assim: "localhost:3000/MeuNome/Linguagem1/Linguagem2". Dessa forma você estará obtendo os dados do proprio usuário  e o EJS fará a renderização na pagina HTML.

# ESTRUTURAS DE REPETIÇÕES NO EJS

Assim como nas linguagens de programação, no EJS podemos adicionar funcionalidades ao nosso html . Nessa etapa faremos um pequeno estudo de condicionais de repetição e realizar alguns testes. **if e else**

## IF

Primeiramente vamos adicionar uma nova variável no nosso arquivo **index.js**, que é o nosso arquivo de configuração do *Express*;

Chamaremos essa variável de **showMsg** ;

E dentro do nosso **app.render** iremos atribuir o valor da variavel **showMsg** ao campo **msg**;

Nosso código ficará assim:



~~~~javascript
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
    var showMsg = true;
    
    res.render("index",{
        nome:nome,//nome recebe a variável nome
        langprog1:langprog1,//langprog1 recebe a variável langprog1
        langprog2:langprog2,//langprog2 recebe a variável langprog2
        empresa:"T-pro",
        funcionarios:2,
        msg:showMsg
    });
});

//definindo a porta

app.listen(3000, () => {
    console.log("App rodando!")
});

~~~~

Note que colocamos o valor da Variável **showMsg** como *true* ;

No código do nosso arquivo **index.ejs**, que é o arquivo que contém nosso html, iremos configurar as informações que serão renderizadas;

Lembrando que para carregar valores de variáveis no *EJS* utilizamos **<%=  %>**, porém quando queremos utilizar somente uma expressão, utilizamos **<%  %>** ;

Nesse pequeno estudo iremos simular uma mensagem de erro , nesse caso utilizaremos **if** para criar uma condição para exibir essa mensagem;

Nosso código ficará assim:

~~~~html
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
        <p>Este site está sendo desenvolvido para ser um tipo de fórum onde se poderão fazer e responder perguntas
            referentes a um sistema que dou suporte</p>
        <%= nome %><br>
            <%= langprog1 %> <br>
                <%= langprog2 %><br>
                    <%= empresa %><br>
                        <%= funcionarios %><br>

                            <% if(msg==true){ %> <!-- !Esse bloco de código fará com que caso o valor da variável showMsg seja verdadeiro dentro do arquivo do nosso servidor Express, irá exibir esta mensagem dentro do H3 -->
                                <h3>
                                    Esta é uma mensagem de erro!
                                </h3>
                                <%}%>



    </body>

</html>  
        
        

</body>
</html>
~~~~

Note que para essa expressão funcionar, devemos sempre abrir e fechar cada parte da expressão.

Para conferir o resultado no navegador, como sempre devemos estar com o nosso **Nodemon** rodando o nosso servidor;

Só pra relembrar, basta você está com o terminal aberto dentro da pasta do projeto e rodar o seguinte comando:

~~~~terminal
nodemon index.ejs
~~~~

<img src="img\rodando_nodemon.png">



Dessa forma nosso Servidor está rodando!!;

E o resultado desse nosso código será:

<img src="img\resultado_msg_erro_condicional.png">



E nossa mensagem apareceu!!;

Lembrando que para aparecer essa página, devemos nos atentar que no nosso arquivo **index.js** configuramos os **req.params** e eles são **OBRIGATÓRIOS**, então se você não passar os parametros de "Nome/LinguagemFavorita1/LinguagemFavorita2" na URL, o servidor aparecerá o seguinte erro:

<img src="img\erro_navegador_sem_params.png">

Para resolver esse erro, bastar você digitar o que se pede no arquivo **index.js**



~~~~javascript
app.get("/:nome/:langpro1/:langpro2", (req, res) =>{
    var nome = req.params.nome;//requisição de parametro OBRIGATÓRIO
    var langprog1 = req.params.langpro1;//requisição de parametro OBRIGATÓRIO 
    var langprog2 = req.params.langpro2;//requisição de parametro OBRIGATÓRIO
    var showMsg = true;
    
    res.render("index",{
        nome:nome,//nome recebe a variável nome
        langprog1:langprog1,//langprog1 recebe a variável langprog1
        langprog2:langprog2,//langprog2 recebe a variável langprog2
        empresa:"T-pro",
        funcionarios:2,
        msg:showMsg
    });
});
~~~~



Então para acessar essa página, você coloca os parâmetros na URL:

~~~~url
http://localhost:3000/nome/linguagemfavorita1/linguagemfavorita2
~~~~

Dessa forma aparecerá a página com essas informações digitadas na URL, juntamente com a nossa mensagem de erro condicional.



## ELSE

Para utilização do **else**, utilizamos a mesma lógica do **if**

Nosso código no arquivo **index.ejs** ficará assim:

~~~~html
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
        <p>Este site está sendo desenvolvido para ser um tipo de fórum onde se poderão fazer e responder perguntas
            referentes a um sistema que dou suporte</p>
        <%= nome %><br>
            <%= langprog1 %> <br>
                <%= langprog2 %><br>
                    <%= empresa %><br>
                        <%= funcionarios %><br>

                            <% if(msg==true){ %>
                                <!-- !Esse bloco de código fará com que caso o valor da variável showMsg
                                seja verdadeiro dentro do arquivo do nosso servidor Express, irá exibir esta mensagem
                                dentro do H3 -->
                                <h3>
                                    Esta é uma mensagem de erro!
                                </h3>
                                <%}else{ %>
                                        <!-- !Esse bloco de código fará com que caso o valor da variável showMsg
                                 não seja verdadeiro dentro do arquivo do nosso servidor Express, irá exibir esta mensagem
                                dentro do H3 -->
                                        <h3>
                                            Sem ERROS!
                                        </h3>
                                        <%}%>


    </body>

</html>

~~~~

E dentro do arquivo **index.js** alteraremos o valor da variável **showMsg** para *false*;

Dessa forma nosso código ficará assim:

~~~~javascript
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
    var showMsg = false;//Mudando o valor desta variável para "false" iremos ativar o "else" contido no nosso código do arquivo "index.ejs"
    
    res.render("index",{
        nome:nome,//nome recebe a variável nome
        langprog1:langprog1,//langprog1 recebe a variável langprog1
        langprog2:langprog2,//langprog2 recebe a variável langprog2
        empresa:"T-pro",
        funcionarios:2,
        msg:showMsg
    });
});

//definindo a porta

app.listen(3000, () => {
    console.log("App rodando!")
});
~~~~

E teremos o seguinte resultado no navegador utilizando o nosso **nodemon**

<img src="img\if_else_result.png">



# ESTRUTURA DE REPETIÇÃO NO EJS

## FOR EACH

Continuaremos nossos estudos em EJS e Express, nesse estudo faremos testes com a estrutura de repetição **for each**. Para isso precisaremos de dados para exibir na nossa página. Então criaremos uma variável que receberá um *array* como valor. Essa variável será chamada de *"personagens"*. Após a criação da nossa variável iremos em seguida adicionar no nosso **res.render** para que possa ser exibida/renderizada na nossa página. Então nosso código no arquivo **index.js** ficará assim:

~~~~javascript
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
    var showMsg = false;
    var personagens = [
        {nome:"Goku", poder:"kamahameha"},
        {nome:"Ichigo", poder:"Getsuga Tenshou"},
        {nome:"Naruto", poder:"Hasengan"},
		{nome:"Seya", poder:"Meteóro de Pegasus"}
    ]//Variável para testar estrutura de repetição for each
    
    res.render("index",{
        nome:nome,//nome recebe a variável nome
        langprog1:langprog1,//langprog1 recebe a variável langprog1
        langprog2:langprog2,//langprog2 recebe a variável langprog2
        empresa:"T-pro",
        funcionarios:2,
        msg:showMsg,
        personagens:personagens//renderização da nossa variavel personagen
    });
});

//definindo a porta

app.listen(3000, () => {
    console.log("App rodando!")
});
~~~~

Depois de implementado nosso código no arquivo **index.js**, iremos configurar o *for each* no nosso arquivo **index.ejs**, para que nossas informações seja renderizadas na nossa página html.

Nosso código ficará assim:

~~~~html
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
        <p>Este site está sendo desenvolvido para ser um tipo de fórum onde se poderão fazer e responder perguntas
            referentes a um sistema que dou suporte</p>
        <%= nome %><br>
            <%= langprog1 %> <br>
                <%= langprog2 %><br>
                    <%= empresa %><br>
                        <%= funcionarios %><br>

                            <% if(msg==true){ %>
                                <!-- !Esse bloco de código fará com que caso o valor da variável showMsg
                                seja verdadeiro dentro do arquivo do nosso servidor Express, irá exibir esta mensagem
                                dentro do H3 -->
                                <h3>
                                    Esta é uma mensagem de erro!
                                </h3>
                                <%}else{ %>
                                    <!-- !Esse bloco de código fará com que caso o valor da variável showMsg
                                 não seja verdadeiro dentro do arquivo do nosso servidor Express, irá exibir esta mensagem
                                dentro do H3 -->
                                    <h3>
                                        Sem ERROS!
                                    </h3>
                                    <%}%>

                                        <% personagens.forEach(function(personagens){%>
                                            <%= personagens.nome%><br>
                                                <%= personagens.poder%><br><hr>
                                                    <%})%>


    </body>

</html>
~~~~

Como resultado teremos essa visualização no navegador:

<img src="img\resultado_foreach.png">

Lembrando que você deve estar com o **nodemon** rodando e com as sequintes requisições na URL.

~~~~~terminal
http://localhost:3000/nome/linguagemfavorita1/linguagemfavorita2
~~~~~

Então você percebeu que o **FOR EACH** é opção ideal para listagem de dados, e está presente em todas as linguagens de programação.

# ARQUIVOS ESTÁTICOS NO EXPRESS

Arquivos estáticos, são arquivos que não são processados no seu back-end, por exemplo: imagens, arquivos css, arquivos javascrip etc;

Para definir que desejamos utilizar *arquivos estáticos* no Express devemos acessar nosso arquivo **index.js** e digitar o seguinte código:

~~~~javascript
app.use(express.static('public'));
~~~~

O nome *'public'* é nome da pasta onde estarão os nossos arquivos estáticos. Você pode utilizar qualquer nome de pasta que funcionará perfeitamente. Mas existe uma convenção que é bastante utilizada na comunidade que devemos nomear essa pasta com o nome 'PUBLIC';

Nosso código em **index.js** ficará assim:

~~~~javascript
const express = require("express");//importando o módulo do express
const app = express();//criar uma instancia do express

//Estou configurando no Express a View Engine (renderizador html) que será utilizado
app.set('view engine', 'ejs');

//Definindo a utilização de arquivos estáticos no Express
app.use(express.static('public'));

//rotas
//rotas com requisição de parametros vinda do usuário
app.get("/:nome/:langpro1/:langpro2", (req, res) =>{
    var nome = req.params.nome;
    var langprog1 = req.params.langpro1;//requisição de parametro 
    var langprog2 = req.params.langpro2;//requisição de parametro 
    var showMsg = false;
    var personagens = [
        {nome:"Goku", poder:"kamahameha"},
        {nome:"Ichigo", poder:"Getsuga Tenshou"},
        {nome:"Naruto", poder:"Hasengan"},
		{nome:"Seya", poder:"Meteóro de Pegasus"}
    ]//Variável para testar estrutura de repetição for each
    
    res.render("index",{
        nome:nome,//nome recebe a variável nome
        langprog1:langprog1,//langprog1 recebe a variável langprog1
        langprog2:langprog2,//langprog2 recebe a variável langprog2
        empresa:"T-pro",
        funcionarios:2,
        msg:showMsg,
        personagens:personagens//renderização da nossa variavel personagen
    });
});

//definindo a porta

app.listen(3000, () => {
    console.log("App rodando!")
});

~~~~



E apenas com esse comando já conseguimos utilizar arquivos estáticos no nosso servidor Express;

Agora deveremos criar de fato nossa pasta PUBLIC;

Dentro da pasta PUBLIC irei criar também a pasta 'CSS', onde ficará a folha de estilos do projeto;

Iremos criar o o arquivo de estilos: **"style.css"** 

<img src="img\criacao_pastas.png">



Agora que criamos nossa pasta PUBLIC e dentro dela a pasta CSS, podemos abrir o arquivo **"style.css"** que criamos dentro da pasta CSS e fazer alguns testes;

Primeiramente, vamos definir que o fundo da nossa página será toda "Azul". Para isso vamos editar nosso arquivo css que ficará assim :

~~~~~css
body{
    background: blue;
}
~~~~~

Nesse exemplo acima, estou selecionando a tag BODY e atribuindo que todo o fundo será azul (Blue);

Ao salvar esse arquivo css, vamos ao arquivo **index.js** e praticaremos o HTML básico. Vamos adicionar a TAG "link" e vamos definir nosso arquivo css. Nosso codigo ficará assim:

~~~~html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- Definindo o arquivo css da página -->
        <link rel="stylesheet" href="/css/style.css">
        <title>Suporte Perguntas e Respostas</title>
    </head>

    <body>
        <h1>Seja Bem Vindo!</h1>
        <p>Este site está sendo desenvolvido para ser um tipo de fórum onde se poderão fazer e responder perguntas
            referentes a um sistema que dou suporte</p>
        <%= nome %><br>
            <%= langprog1 %> <br>
                <%= langprog2 %><br>
                    <%= empresa %><br>
                        <%= funcionarios %><br>

                            <% if(msg==true){ %>
                                <!-- !Esse bloco de código fará com que caso o valor da variável showMsg
                                seja verdadeiro dentro do arquivo do nosso servidor Express, irá exibir esta mensagem
                                dentro do H3 -->
                                <h3>
                                    Esta é uma mensagem de erro!
                                </h3>
                                <%}else{ %>
                                    <!-- !Esse bloco de código fará com que caso o valor da variável showMsg
                                 não seja verdadeiro dentro do arquivo do nosso servidor Express, irá exibir esta mensagem
                                dentro do H3 -->
                                    <h3>
                                        Sem ERROS!
                                    </h3>
                                    <%}%>

                                        <% personagens.forEach(function(personagens){%>
                                            <h3><%= personagens.nome%></h3>
                                            <h4><%= personagens.poder%></h4><hr>
                                                    <%})%>


    </body>

</html>
~~~~

Se você prestar atenção na TAG:

~~~~html
<!-- Definindo o arquivo css da página -->
        <link rel="stylesheet" href="/css/style.css">
~~~~

Nós não precisamos colocar o caminho completo ...href="public/css/style.css"...Referenciando a pasta PUBLIC, basta colocar no inicio '/' em seguida ""...css/style.css";

Ao acessar nosso projeto após inicializar nosso nodemon, veremos assim:

<img src="img\resultado_css.png">

E teremos nossa página com fundo azul.
