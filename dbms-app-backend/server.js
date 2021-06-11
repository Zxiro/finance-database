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
      enterprise_symbol: 9999,
      operation_cash:100,
      investing_cash:200,
      financing_cash:300
    });
    const enter2 = await enterprise_controller.create({
      enterprise_symbol: 9998,
      operation_cash:400,
      investing_cash:500,
      financing_cash:600
    });
    const enter3 = await enterprise_controller.create({
      enterprise_symbol: 9997,
      operation_cash:700,
      investing_cash:800,
      financing_cash:900
    });
    const enter4 = await enterprise_controller.create({
      enterprise_symbol: 9996
    });
    const enter5 = await enterprise_controller.create({
      enterprise_symbol: 9995
    });
    const enter6 = await enterprise_controller.create({
      enterprise_symbol: 9994
    });
    const enter7 = await enterprise_controller.create({
      enterprise_symbol: 9993
    });
    const enter8 = await enterprise_controller.create({
      enterprise_symbol: 9992
    });
    const enter9 = await enterprise_controller.create({
      enterprise_symbol: 9991
    });
    const enter10 = await enterprise_controller.create({
      enterprise_symbol: 9990
    });



    const stock1 = await stock_controller.create(enter1.enterprise_symbol, {
      stock_symbol: 2330,
      open_price: 600,
      close_price:610,
      high_price:615,
      low_price:605,
      volume:30000
    });
    const stock2 = await stock_controller.create(enter2.enterprise_symbol, {
      stock_symbol: 2454,
      open_price: 1005,
      close_price:980,
      high_price:1010,
      low_price:1000,
      volume:10000
    });
    const stock3 = await stock_controller.create(enter3.enterprise_symbol, {
      stock_symbol: 2303,
      open_price: 50,
      close_price:55,
      high_price:57,
      low_price:48,
      volume:100000
    });
    const stock4 = await stock_controller.create(enter4.enterprise_symbol, {
      stock_symbol: 3037,
      open_price: 125,
      close_price:130,
      high_price:135,
      low_price:120,
      volume:40000
    });
    const stock5 = await stock_controller.create(enter5.enterprise_symbol, {
      stock_symbol: 2303,
      open_price: 50,
      close_price:55,
      high_price:57,
      low_price:48,
      volume:100000
    });
    const stock6 = await stock_controller.create(enter6.enterprise_symbol, {
      stock_symbol: 2890,
      open_price: 14,
      close_price:18,
      high_price:20,
      low_price:12,
      volume:35000
    });
    const stock7 = await stock_controller.create(enter7.enterprise_symbol, {
      stock_symbol: 2881,
      open_price: 75,
      close_price:77,
      high_price:78,
      low_price:70,
      volume:20000
    });
    const stock8 = await stock_controller.create(enter8.enterprise_symbol, {
      stock_symbol: 3034,
      open_price: 519,
      close_price:506,
      high_price:523,
      low_price:506,
      volume:8000
    });
    const stock9 = await stock_controller.create(enter9.enterprise_symbol, {
      stock_symbol: 2379,
      open_price: 500,
      close_price:550,
      high_price:570,
      low_price:480,
      volume:10000
    });
    const stock10 = await stock_controller.create(enter10.enterprise_symbol, {
      stock_symbol: 2603,
      open_price: 115,
      close_price:124,
      high_price:124,
      low_price:114,
      volume:600000
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
    /*const test1 = await enterprise_controller.getlongBySymbol(enter1.enterprise_symbol)
    console.log(
      "Enterprise with its long=",
      JSON.stringify(test1, null, 2)
    );
    const test2 = await enterprise_controller.getshortBySymbol(enter1.enterprise_symbol)
    console.log(
      "Enterprise with its short=",
      JSON.stringify(test2, null, 2)
    );*/
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