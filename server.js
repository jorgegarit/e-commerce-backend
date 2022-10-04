const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call to use the routes 
app.use(routes);

// sync sequelize models to the database, then turn on the server

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
