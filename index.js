const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const greetingOpp = require("./greetings");
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

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", function(req, res) {
 console.log(req.body);
  const counter = greetings.nameCounter();
  const msg = greetings.errorMsg();
  res.render("index", { greetedNames, counter, msg });
});


app.post("/greeting", function(req, res){


     var personName = req.body.personsName;
     var myLang = req.body.myLang;
     const greetDisplay = greetings.greet(personName, myLang);

     greetedNames = greetDisplay

    res.redirect("/")
})

const PORT = process.env.PORT || 5080;

app.listen(PORT, function() {
  console.log("App has started", PORT);
});
