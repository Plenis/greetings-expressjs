const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const greetingOpp = require("./greetings");
const flash = require("express-flash");
const session = require("express-session");
let messageDisplay = "";

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
app.use(
  session({
    secret: "message",
    resave: false,
    saveUninitialized: true
  })
);

// initialise the flash middleware
app.use(flash());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", function(req, res) {
  // console.log(req.body);
  const counter = greetings.nameCounter();
  messageDisplay = greetings.greetMessage();
  console.log("messageDisplay: " + messageDisplay)
  console.log("counter: " + counter)
   res.render("index", {
    messageDisplay,
    counter
  });
});

app.post("/greeting", function(req, res){
  const personName = req.body.personsName;
  const myLang = req.body.myLang;

   greetDisplay = greetings.greet(personName, myLang);

  // greetedNames = greetDisplay;
  // console.log(greetedNames + " lolo")
  
   if (personName === "" && myLang === undefined) {
    req.flash("info", "Please enter and name and choose a language");
    res.redirect("/");
  } else if (personName === "") {
    req.flash("info", "Please enter a name!");
    res.redirect("/");
  } else if (myLang === undefined) {
    req.flash("info", "Please choose a language!");
    res.redirect("/");
  }
  res.redirect("/")
})

// app.post("/greeting", function(req, res) {
//   const personName = req.body.personsName;
//   const myLang = req.body.myLang;
//   const greetDisplay = greetings.greetMessage();
//   console.log(greetDisplay)

// if (personName === "" && myLang === undefined) {
//   req.flash("info", "Please enter and name and choose a language");
//   res.redirect("/");
// } else if (personName === "") {
//   req.flash("info", "Please enter a name!");
//   res.redirect("/");
// } else if (myLang === undefined) {
//   req.flash("info", "Please choose a language!");
//   res.redirect("/");

//   } else {
//    res.render("index",{greetedNames : greetDisplay});
//     res.redirect("/");
//   }
// });

const PORT = process.env.PORT || 3200;

app.listen(PORT, function() {
  console.log("App has started", PORT);
});
