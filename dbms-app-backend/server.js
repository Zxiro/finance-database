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
      enterprise_symbol: 22099131,
      operation_cash:222100,
      investing_cash:333200,
      financing_cash:444300
    });
    const enter2 = await enterprise_controller.create({
      enterprise_symbol: 84149961,
      operation_cash:878400,
      investing_cash:598700,
      financing_cash:654600
    });
    const enter3 = await enterprise_controller.create({
      enterprise_symbol:47217677,
      operation_cash:123700,
      investing_cash:543800,
      financing_cash:765900
    });
    const enter4 = await enterprise_controller.create({
      enterprise_symbol: 23535435,
      operation_cash:847000,
      investing_cash:765500,
      financing_cash:933300
    });
    const enter5 = await enterprise_controller.create({
      enterprise_symbol: 27951609,
      operation_cash:127000,
      investing_cash:348500,
      financing_cash:569300
    });
    const enter6 = await enterprise_controller.create({
      enterprise_symbol: 80333183,
      operation_cash:230000,
      investing_cash:190000,
      financing_cash:100000
    });
    const enter7 = await enterprise_controller.create({
      enterprise_symbol: 30374805,
      operation_cash:700000,
      investing_cash:800500,
      financing_cash:600000
    });
    const enter8 = await enterprise_controller.create({
      enterprise_symbol: 84149955,
      operation_cash:17000,
      investing_cash:80500,
      financing_cash:9300
    });
    const enter9 = await enterprise_controller.create({
      enterprise_symbol: 22671299,
      operation_cash:77000,
      investing_cash:88500,
      financing_cash:93300
    });
    const enter10 = await enterprise_controller.create({
      enterprise_symbol: 11337775,
      operation_cash:60000,
      investing_cash:18500,
      financing_cash:96300
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
      stock_symbol: 8299,
      close_price:505,
      high_price:507,
      low_price:408,
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
      option_symbol: 1001,
      open_price: 100,
      close_price:102,
      high_price:103,
      low_price:102,
      volume:40000
    });
    const option1_2 = await option_controller.create(stock1.stock_symbol, {
      option_symbol: 1002,
      open_price: 201,
      close_price:203,
      high_price:203,
      low_price:200,
      volume:80000
    });
    const option1_3 = await option_controller.create(stock1.stock_symbol, {
      option_symbol: 1003,
      open_price: 302,
      close_price:304,
      high_price:308,
      low_price:302,
      volume:10000
    });
    const option2_1 = await option_controller.create(stock2.stock_symbol, {
      option_symbol: 2001,
      open_price: 100,
      close_price:102,
      high_price:103,
      low_price:102,
      volume:4000
    });
    const option2_2 = await option_controller.create(stock2.stock_symbol, {
      option_symbol: 2002,
      open_price: 201,
      close_price:203,
      high_price:203,
      low_price:109,
      volume:70000
    });
    const option2_3 = await option_controller.create(stock2.stock_symbol, {
      option_symbol: 2003,
      open_price: 302,
      close_price:304,
      high_price:305,
      low_price:302,
      volume:100000
    });
    const option3_1 = await option_controller.create(stock3.stock_symbol, {
      option_symbol: 3001,
      open_price: 50,
      close_price:50,
      high_price:50,
      low_price:40,
      volume:100000
    });
    const option4 = await option_controller.create(stock4.stock_symbol, {
      option_symbol: 4001,
      open_price: 102,
      close_price:103,
      high_price:103,
      low_price:102,
      volume:90000
    });
    const option5 = await option_controller.create(stock5.stock_symbol, {
      option_symbol: 5001,
      open_price:500, 
      close_price:500,
      high_price:500,
      low_price:400,
      volume:100000
    });
    const option6 = await option_controller.create(stock6.stock_symbol, {
      option_symbol:6001,
      open_price: 40,
      close_price:80,
      high_price:100,
      low_price:10,
      volume:35000
    });
    const option7 = await option_controller.create(stock7.stock_symbol, {
      option_symbol: 7001,
      open_price: 8,
      close_price:8,
      high_price:8,
      low_price:8,
      volume:2000
    });
    const option8 = await option_controller.create(stock8.stock_symbol, {
      option_symbol: 8001,
      open_price: 501,
      close_price:500,
      high_price:502,
      low_price:500,
      volume:8000
    });
    const option9 = await option_controller.create(stock9.stock_symbol, {
      option_symbol: 9001,
      open_price: 500,
      close_price:505,
      high_price:507,
      low_price:408,
      volume:10000
    });
    const option10 = await option_controller.create(stock10.stock_symbol, {
      option_symbol:10001,
      open_price: 101,
      close_price:102,
      high_price:104,
      low_price:101,
      volume:60000
    });


    const bond1_1 = await bond_controller.create(enter1.enterprise_symbol, {
      bond_symbol: 1111,
      open_price: 100,
      close_price:120,
      high_price:135,
      low_price:120,
      volume:40000
    });
    const bond1_2 = await bond_controller.create(enter1.enterprise_symbol, {
      bond_symbol: 1222,
      open_price: 210,
      close_price:230,
      high_price:235,
      low_price:200,
      volume:80000
    });
    const bond1_3 = await bond_controller.create(enter1.enterprise_symbol, {
      bond_symbol: 133,
      open_price: 320,
      close_price:340,
      high_price:335,
      low_price:320,
      volume:10000
    });
    const bond2_1 = await bond_controller.create(enter2.enterprise_symbol, {
      bond_symbol: 211,
      open_price: 100,
      close_price:120,
      high_price:135,
      low_price:120,
      volume:40000
    });
    const bond2_2 = await bond_controller.create(enter2.enterprise_symbol, {
      bond_symbol: 222,
      open_price: 210,
      close_price:230,
      high_price:235,
      low_price:190,
      volume:70000
    });
    const bond2_3 = await bond_controller.create(enter2.enterprise_symbol, {
      bond_symbol: 2333,
      open_price: 320,
      close_price:340,
      high_price:355,
      low_price:320,
      volume:100000
    });
    const bond3_1 = await bond_controller.create(enter3.enterprise_symbol, {
      bond_symbol: 311,
      open_price: 50,
      close_price:55,
      high_price:57,
      low_price:48,
      volume:100000
    });
    const bond4 = await bond_controller.create(enter4.enterprise_symbol, {
      bond_symbol: 411,
      open_price: 125,
      close_price:130,
      high_price:135,
      low_price:120,
      volume:90000
    });
    const bond5 = await bond_controller.create(enter5.enterprise_symbol, {
      bond_symbol: 511,
      open_price:500, 
      close_price:505,
      high_price:507,
      low_price:408,
      volume:100000
    });
    const bond6 = await bond_controller.create(enter6.enterprise_symbol, {
      bond_symbol:611,
      open_price: 14,
      close_price:18,
      high_price:20,
      low_price:12,
      volume:35000
    });
    const bond7 = await bond_controller.create(enter7.enterprise_symbol, {
      bond_symbol: 711,
      open_price: 75,
      close_price:77,
      high_price:78,
      low_price:70,
      volume:20000
    });
    const bond8 = await bond_controller.create(enter8.enterprise_symbol, {
      bond_symbol: 811,
      open_price: 519,
      close_price:506,
      high_price:523,
      low_price:506,
      volume:8000
    });
    const bond9 = await bond_controller.create(enter9.enterprise_symbol, {
      bond_symbol: 911,
      open_price: 500,
      close_price:550,
      high_price:570,
      low_price:480,
      volume:10000
    });
    const bond10 = await bond_controller.create(enter10.enterprise_symbol, {
      bond_symbol:1011,
      open_price: 115,
      close_price:124,
      high_price:124,
      low_price:114,
      volume:600000
    });

    const future1_1 = await future_controller.create(stock1.stock_symbol, {
      future_symbol: 101,
      open_price: 10,
      close_price:12,
      high_price:13,
      low_price:12,
      volume:4000
    });
    const future1_2 = await future_controller.create(stock1.stock_symbol, {
      future_symbol: 102,
      open_price: 21,
      close_price:23,
      high_price:23,
      low_price:20,
      volume:8000
    });
    const future1_3 = await future_controller.create(stock1.stock_symbol, {
      future_symbol: 103,
      open_price: 32,
      close_price:34,
      high_price:38,
      low_price:32,
      volume:10000
    });
    const future2_1 = await future_controller.create(stock2.stock_symbol, {
      future_symbol: 201,
      open_price: 10,
      close_price:12,
      high_price:13,
      low_price:12,
      volume:400
    });
    const future2_2 = await future_controller.create(stock2.stock_symbol, {
      future_symbol: 202,
      open_price: 21,
      close_price:23,
      high_price:23,
      low_price:19,
      volume:7000
    });
    const future2_3 = await future_controller.create(stock2.stock_symbol, {
      future_symbol: 203,
      open_price: 32,
      close_price:34,
      high_price:35,
      low_price:32,
      volume:10000
    });
    const future3_1 = await future_controller.create(stock3.stock_symbol, {
      future_symbol: 301,
      open_price: 5,
      close_price:5,
      high_price:5,
      low_price:4,
      volume:10000
    });
    const future4 = await future_controller.create(stock4.stock_symbol, {
      future_symbol: 401,
      open_price: 12,
      close_price:13,
      high_price:13,
      low_price:12,
      volume:9000
    });
    const future5 = await future_controller.create(stock5.stock_symbol, {
      future_symbol: 501,
      open_price:50, 
      close_price:50,
      high_price:50,
      low_price:40,
      volume:10000
    });
    const future6 = await future_controller.create(stock6.stock_symbol, {
      future_symbol:601,
      open_price: 4,
      close_price:8,
      high_price:10,
      low_price:1,
      volume:3500
    });
    const future7 = await future_controller.create(stock7.stock_symbol, {
      future_symbol: 701,
      open_price: 7,
      close_price:7,
      high_price:7,
      low_price:7,
      volume:2000
    });
    const future8 = await future_controller.create(stock8.stock_symbol, {
      future_symbol: 801,
      open_price: 51,
      close_price:50,
      high_price:52,
      low_price:50,
      volume:800
    });
    const future9 = await future_controller.create(stock9.stock_symbol, {
      future_symbol: 901,
      open_price: 50,
      close_price:55,
      high_price:57,
      low_price:48,
      volume:1000
    });
    const future10 = await future_controller.create(stock10.stock_symbol, {
      future_symbol:1001,
      open_price: 11,
      close_price:12,
      high_price:14,
      low_price:11,
      volume:60000
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
};
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  buildData();
});