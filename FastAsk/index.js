const express = require("express"); // Importanto modulo
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta")
//Database

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão Feita");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })


app.set('view engine','ejs'); // Setando o motor HTML como EJS, para desenhar o HTML!
app.use(express.static('public')); //Setando para termos arquivos estáticos(IMGS, CSS, ETC)
//BodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Rotas

app.get("/", (req,res)=>{ 
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas
        })
    });// SELECT * ALL FROM PERGUNTAS
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

app.post("/salvapergunta",(req,res)=>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo,
        descricao
    }).then(()=>{
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req,res)=>{
    let ide = req.params.id;
    Pergunta.findOne({
        where: {id: ide}
    }).then(pergunta=>{
        if(pergunta != undefined){ //Achou a pergunta

            Resposta.findAll({
                where:{perguntaId: pergunta.id},
                order:[
                    ['id','DESC']
                ]
            }).then(respostas=>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas:respostas
                })
            })
        }else{ //Não achou a pergunta
            res.redirect("/");
        }
    });
});

app.post("/responder", (req,res)=>{
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo,
        perguntaId
    }).then(()=>{
        res.redirect(`/pergunta/${perguntaId}`)
    })
});

app.listen(8080,()=>{ // Rodando servidor
    console.log("Rodando");
})