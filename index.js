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

app.get("/", async function(req, res) {
  messageDisplay = await greetings.greetMessage();
  res.render("index", {
    counter: await greetings.nameCounter(),
    messageDisplay
  });
});

app.post("/greeting", async function(req, res) {
  const personName = req.body.personsName;
  const myLang = req.body.myLang;

  greetings.greetMessage(personName);

  greetDisplay = await greetings.greet(personName, myLang);

  if (personName === "" && myLang === undefined) {
    await req.flash("info", "Please enter and name and choose a language");
  } else if (personName === "") {
    await req.flash("info", "Please enter a name!");
  } else if (myLang === undefined) {
    await req.flash("info", "Please choose a language!");
  }

  res.redirect("/");
});

app.get("/greeted", async function(req, res) {
  res.render("greeted", {
    greetedNames: await greetings.tableData()
  });
});

const PORT = process.env.PORT || 2330;

app.listen(PORT, function() {
  console.log("App has started", PORT);
});
