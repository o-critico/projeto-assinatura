import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import { signatureGenerator } from './services/signature-generator.js';

const app = express();

// set the view engine to hbs
app.engine('hbs', engine( {defaultLayout: 'main',extname: '.hbs'} ));
app.set('view engine', 'hbs');
app.set('views', '/home/mess/Files/Node/projeto-assinatura/src/views');
app.use(express.static('../../public'));

// Body Parser
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

// Data
const layoutConfig = [
  {
    name: "firstName",
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
  constructor (firstName, lastName, email, occupation, extNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.occupation = occupation;
    this.extNumber = extNumber;
  }
};

// Routs
app.get('/', ( req, res ) => {
  res.status(200).render('form');
});

app.post('/', ( req, res ) => {

  const user = new User(
    req.body.firstName.trim(),
    req.body.lastName.trim(),
    req.body.email.trim(),
    req.body.occupation.trim(),
    req.body.extNumber.trim()
  );

  if (req.body.branch == 'EP1') {
    user.address = 'Conde';
    user.telephone = `+55 83 2107-EP1 | ${user.extNumber}`;
  }

  if (req.body.branch == 'EP2') {
    user.address = 'Rua Capitão José Rodrigues do Ó, 870.\nDistrito Industrial | João Pessoa, PB.';
    user.telephone = `+55 83 2107-2000 | ${user.extNumber}`;
  }

  if (req.body.branch == 'ESUL') {
    user.address = "Criciuma";
    user.telephone = `+55 55 2107-ESUL | ${user.extNumber}`;
  }

  if (req.body.branch == 'ERN') {
    user.address = "Rio grande do NORTE";
    user.telephone = `+55 55 2107-RN | ${user.extNumber}`;
  }

  signatureGenerator(user, layoutConfig).then( () => {
    user.pathSignature = `/home/mess/Files/Node/projeto-assinatura/public/results/${user.firstName}${user.lastName}.png`;
    user.signature = true;
    res.sendFile(user.pathSignature);
  });

});

export default app;
