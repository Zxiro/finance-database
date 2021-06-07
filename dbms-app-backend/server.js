const express = require("express"); // load module
const cors = require("cors");
const app = express();

var corsOption = {
    origin: "http://localhost:8081" //Data origin source
}

app.use(cors(corsOption));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DBMS final project fin_db." });
});

require("./routes/fin_route")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");//entry point index.js
const enterprise_controller = require("./controllers/enterprise_controller");
const stock_controller = require("./controllers/stock_controller");
const buildData = async () => {
  try{
    const enter1 = await enterprise_controller.create({
      enterprise_symbol: 6208
    });
    const stock1 = await stock_controller.create(enter1.enterprise_symbol, {
      stock_symbol: 2330,
      open_price: 600,
      close_price:50,
    });
    const test1 = await enterprise_controller.getStockByEnterpiseSymbol(enter1.enterprise_symbol)
  console.log(
    "Enterprise with its all bitch=",
    JSON.stringify(test1, null, 2)
  );
  }catch(err){
    console.log(err);
  }
  
  /*const tut2 = await controller.createTutorial({
    title: "Tut#2",
    description: "Tut#2 Description",
  });

  

  await controller.createComment(tut1.id, {
    name: "zkoder",
    text: "One of the best tuts!",
  });

  const comment2 = await controller.createComment(tut2.id, {
    name: "aKoder",
    text: "Hi, thank you!",
  });

  await controller.createComment(tut2.id, {
    name: "anotherKoder",
    text: "Awesome tut!",
  });

  const tut1Data = await controller.findTutorialById(tut1.id);
  console.log(
    ">> Tutorial id=" + tut1Data.id,
    JSON.stringify(tut1Data, null, 2)
  );

  const tut2Data = await controller.findTutorialById(tut2.id);
  console.log(
    ">> Tutorial id=" + tut2Data.id,
    JSON.stringify(tut2Data, null, 2)
  );

  const comment1Data = await controller.findCommentById(comment1.id);
  console.log(
    ">> Comment id=" + comment1.id,
    JSON.stringify(comment1Data, null, 2)
  );

  const comment2Data = await controller.findCommentById(comment2.id);
  console.log(
    ">> Comment id=" + comment2.id,
    JSON.stringify(comment2Data, null, 2)
  );

  const tutorials = await controller.findAll();
  console.log(">> All tutorials", JSON.stringify(tutorials, null, 2));*/
};
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  buildData();
});