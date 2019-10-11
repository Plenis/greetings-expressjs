const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const greetingOpp = require("./greetings");
const flash = require('express-flash');
const session = require('express-session');
let greetedNames = "";

const app = express();
const greetings = greetingOpp();

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    extname: ".handlebars",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
  })
);
app.set("view engine", "handlebars");

  // initialise session middleware - flash-express depends on it
  app.use(session({
    secret : "message",
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
  app.use(flash());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", function(req, res) {  
  const counter = greetings.nameCounter();
  if(greetedNames !== ""){
    res.redirect("/", counter);
  }
  res.render("index", {
    greetedNames,
    counter
  });
});

app.post("/greeting", function(req, res) {
  const personName = req.body.personsName;
  const myLang = req.body.myLang;
  const greetDisplay = greetings.greet(personName, myLang);

if(personName === '' && myLang === undefined){
  req.flash('info', 'Please enter and name and choose a language');
  res.redirect('/');
}
  else if(personName === ''){
    req.flash('info', 'Please enter a name!');
    res.redirect('/');
  }
  else if(myLang === undefined){
    req.flash('info', 'Please choose a language!');
    res.redirect('/');

  }else{
  greetedNames  = greetDisplay;
  res.redirect('/');
  }
})


const PORT = process.env.PORT || 7800;

app.listen(PORT, function() {
  console.log("App has started", PORT);
});
