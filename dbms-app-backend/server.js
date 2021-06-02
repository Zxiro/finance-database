const express = require("express"); // load module
//const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOption = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOption));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DBMS final project." });
});


require("./routes/stock_route")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

