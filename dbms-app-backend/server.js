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
const bond_controller = require("./controllers/bond_controller");
const option_controller = require("./controllers/option_controller");
const future_controller = require("./controllers/future_controller");


const buildData = async () => {
  try{
    const enter1 = await enterprise_controller.create({
      enterprise_symbol: 9999
    });
    const enter2 = await enterprise_controller.create({
      enterprise_symbol: 9998
    });
    const enter3 = await enterprise_controller.create({
      enterprise_symbol: 9997
    });
    const enter4 = await enterprise_controller.create({
      enterprise_symbol: 9996
    });
    const stock1 = await stock_controller.create(enter1.enterprise_symbol, {
      stock_symbol: 2330,
      open_price: 600,
      close_price:50
    });
    const stock2 = await stock_controller.create(enter2.enterprise_symbol, {
      stock_symbol: 2454,
      open_price: 900,
      close_price:90
    });
    const stock3 = await stock_controller.create(enter3.enterprise_symbol, {
      stock_symbol: 2303,
      open_price: 50,
      close_price:80
    });
    const stock4 = await stock_controller.create(enter4.enterprise_symbol, {
      stock_symbol: 2037,
      open_price: 500,
      close_price:650
    });
    await enterprise_controller.addLongStock(stock1.stock_symbol, enter1.enterprise_symbol, 50);
    await enterprise_controller.addLongStock(stock2.stock_symbol, enter1.enterprise_symbol, 100);
    await enterprise_controller.addLongStock(stock2.stock_symbol, enter2.enterprise_symbol, 150);
    await enterprise_controller.addShortStock(stock3.stock_symbol, enter1.enterprise_symbol, 50);
    await enterprise_controller.addShortStock(stock4.stock_symbol, enter1.enterprise_symbol, 100);
    await enterprise_controller.addShortStock(stock4.stock_symbol, enter2.enterprise_symbol, 150);
    const option1_1 = await option_controller.create(stock1.stock_symbol, {
      option_symbol: 12330,
      open_price: 10,
      close_price:12
    });
    const option1_2 = await option_controller.create(stock1.stock_symbol, {
      option_symbol: 22330,
      open_price: 13,
      close_price:14
    });
    const option1_3 = await option_controller.create(stock1.stock_symbol, {
      option_symbol: 32330,
      open_price: 15,
      close_price:16
    });
    const bond1_1 = await bond_controller.create(enter1.enterprise_symbol, {
      bond_symbol: 11,
      open_price: 100,
      close_price:120
    });
    const bond1_2 = await bond_controller.create(enter1.enterprise_symbol, {
      bond_symbol: 22,
      open_price: 210,
      close_price:230
    });
    const bond1_3 = await bond_controller.create(enter1.enterprise_symbol, {
      bond_symbol: 33,
      open_price: 320,
      close_price:340
    });
    const bond2_1 = await bond_controller.create(enter2.enterprise_symbol, {
      bond_symbol: 1,
      open_price: 100,
      close_price:120
    });
    const bond2_2 = await bond_controller.create(enter2.enterprise_symbol, {
      bond_symbol: 2,
      open_price: 210,
      close_price:230
    });
    const bond2_3 = await bond_controller.create(enter2.enterprise_symbol, {
      bond_symbol: 3,
      open_price: 320,
      close_price:340
    });
    const test1 = await enterprise_controller.getlongBySymbol(enter1.enterprise_symbol)
    console.log(
      "Enterprise with its long=",
      JSON.stringify(test1, null, 2)
    );
    const test2 = await enterprise_controller.getshortBySymbol(enter1.enterprise_symbol)
    console.log(
      "Enterprise with its short=",
      JSON.stringify(test2, null, 2)
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