const { Sequelize } = require('sequelize');

// @TODO: change database name
const sequelize = new Sequelize('mosqmap', 'user', 'password', {
  host: 'db',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

sequelize.sync();

module.exports = sequelize;
