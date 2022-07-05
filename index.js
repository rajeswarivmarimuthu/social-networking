//import necessary functions and libraries
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Port setup to access the hosted application 
const PORT = process.env.PORT || 3001;
const app = express();

//setting up middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//Once the db connection is established, listening tho the hosted port to perform user action
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}!`);
  });
});