var express = require("express");
var cors = require("cors");
var path = require("path");
const PORTA = 3333;

var app = express();

var indexRouter = require("./route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.use(cors());

app.use("/", indexRouter);

app.listen(PORTA, function () {
    console.log(`Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    Acesse o caminho a seguir para visualizar: http://localhost:${PORTA}`)
});