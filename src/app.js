import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import { signatureGenerator } from './services/signature-generator.js';

const app = express();

// set the view engine to hbs
app.engine('hbs', engine( {defaultLayout: 'main',extname: '.hbs'} ));
app.set('view engine', 'hbs');
app.set('views', '/home/mess/Files/Node/projeto-assinatura/src/views');
app.use(express.static("images"))

// Body Parser
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

// Data
const layoutConfig = [
  {
    name: "nome",
    fontPath: "/home/mess/Files/Node/projeto-assinatura/public/fonts/Montserrat/Montserrat-SemiBold.ttf",
    fontStyle: "SemiBold",
    fontFamily: "Montserrat-SemiBold",
    fontSize: "38pt",
    fontColor: "#004e5d",
    y: 51,
    x: 51
  },
  {
    name:"occupation",
    fontPath: "/home/mess/Files/Node/projeto-assinatura/public/fonts/Montserrat/Montserrat-Medium.ttf",
    fontStyle: "Medium",
    fontFamily: "Montserrat-Medium",
    fontSize: "19pt",
    fontColor: "#757575",
    y: 125,
    x: 51
  },
  {
    name: "telephone",
    fontPath: "/home/mess/Files/Node/projeto-assinatura/public/fonts/Montserrat/Montserrat-Medium.ttf",
    fontStyle: "Medium",
    fontFamily: "Montserrat-Medium",
    fontSize: "15pt",
    fontColor: "#757575",
    y: 160,
    x: 51
  },
  {
    name: "address",
    fontPath: "/home/mess/Files/Node/projeto-assinatura/public/fonts/Montserrat/Montserrat-Regular.ttf",
    fontStyle: "Regular",
    fontFamily: "Montserrat-Regular",
    fontSize: "16pt",
    fontColor: "#757575",
    y: 360,
    x: 51
  }
];

// Routs
app.get('/', ( req, res ) => {
  res.status(200).render('form');
});

app.post('/', ( req, res ) => {
  if (req.body.EP2 == 'on'){
    req.body.address = "Rua Capitão José Rodrigues do Ó, 870.\nDistrito Industrial | João Pessoa, PB."
  }
  signatureGenerator(req.body, layoutConfig).then( () => {
    req.body.signature = true;
    req.body.pathSignature = `/home/mess/Files/Node/projeto-assinatura/public/results/${req.body.name}${req.body.lastname}.png`;
    console.log(req.body);
    res.sendFile(req.body.pathSignature);
  });
});

export default app;
