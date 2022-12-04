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

// Class
class User {
  constructor (firstName, lastName, email, occupation, telephone) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.occupation = occupation;
    this.telephone = telephone;
  }
};

// Routs
app.get('/', ( req, res ) => {
  res.status(200).render('form');
});

app.post('/', ( req, res ) => {

  const user = new User(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.occupation,
    req.body.telephone
  );

  if (req.body.EP2 == 'on'){
      user.address = "Rua Capitão José Rodrigues do Ó, 870.\nDistrito Industrial | João Pessoa, PB."
  }

  signatureGenerator(user, layoutConfig).then( () => {
    user.pathSignature = `/home/mess/Files/Node/projeto-assinatura/public/results/${user.firstName}${user.lastName}.png`;
    user.signature = true;
    res.sendFile(user.pathSignature);
    console.log(user);
  });

});

export default app;
