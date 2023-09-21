const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('library', 'root', 'Lakshmi@2002', {
  host: 'localhost',
  dialect: 'mysql',
});

const Book = sequelize.define('Book', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  takenOn: {
    type: DataTypes.DATE,
  },
  returnDate: {
    type: DataTypes.DATE,
  },
  fine: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});


sequelize.sync()
  .then(() => {
    console.log('Book table created successfully');
  })
  .catch((err) => {
    console.error('Error creating Book table:', err);
  });

module.exports = Book;