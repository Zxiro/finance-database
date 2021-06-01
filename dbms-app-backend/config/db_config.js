module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "yang1029",
    DB: "postgres",
    dialect: "postgres", // Type of database you try to connect to 
    pool: {
      max: 5, // Max connection
      min: 0, // Min connection
      idle: 10000, // Max idle time in milliseconds
      acquire: 30000 // Max trying to get connection time in milliseconds
    }
  };