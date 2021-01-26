
// require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(
    // session({ secret:process.env.SESSION_SECRET, resave: true, saveUninitialized: true })
    session({ secret:"asflkjd", resave: true, saveUninitialized: true })
);

require("./routes/routes")(app);

// const handlebars = require("express-handlebars");

// app.engine("handlebars", handlebars({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// const routes = require("./routes/routes");

// const socket = require("socket.io");

db.sequelize.sync({ force: true })
    .then(function() {
        const server = app.listen(PORT, function() {
            console.log("Server listening on: http://localhost:" + PORT);
        })
        require('./sockets')(server)
    })