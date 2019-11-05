const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const greetingOpp = require("./greetings");
const flash = require("express-flash");
const session = require("express-session");
let messageDisplay = "";

const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || "postgresql://sino:codex123@localhost:5432/greeting_opp";

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

const greetings = greetingOpp(pool);

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
  var personsName = req.body.personsName.replace(/[\W\d_]/g, '');
  const myLang = req.body.myLang;
  

  greetings.greetMessage(personsName);

  greetDisplay = await greetings.greet(personsName, myLang);

  if (personsName === "" && myLang === undefined) {
    await req.flash("info", "Please enter and name and choose a language");
  } else if (personsName === "") {
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

// app.get("/counter", async function (req, res){
//   res.render("greeted", await greetings.nameCounter())
// })

app.get("/counter/:user", async function(req, res){
  let name = req.params.user;
  let user = await greetings.nameGreeted(name);

  res.render("counter",{
  userInfo: user
  })
})

app.post("/clear", async function(req, res) {
 await greetings.clearData()
res.redirect('/')
});

app.get('/backToHome', async function(req, res){
  res.redirect('/')
})

app.get('/backToGreeted', async function(req, res){
  res.redirect('/greeted')
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("App has started", PORT);
});
