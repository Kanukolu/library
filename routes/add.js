const express = require('express');
const router = express.Router();
const { Book } = require('../database'); 


router.get('/search', async (req, res) => {
  try {
    const bookName = req.query.name; 

    
    const books = await Book.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${bookName}%,` 
        },
      },
    });

    
    res.json(books);
  } catch (error) {
    console.error('Error searching for books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;