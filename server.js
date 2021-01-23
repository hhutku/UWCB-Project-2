const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const handlebars = require("express-handlebars");

// app.engine("handlebars", handlebars({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

const db = require("./models")
// const routes = require("./routes/routes");

// const socket = require("socket.io");

db.sequelize.sync({ force: true }).then(function() {

    app.listen(PORT, function() {
        console.log("Server listening on: http://localhost:" + PORT);
    })
})