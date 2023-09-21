const express = require('express');
const router = express.Router();
const { Book } = require('../models/book');


router.post('/borrow', async (req, res) => {
  try {
    const { name, author } = req.body;
    const takenOn = new Date();
    const returnDate = new Date();
    returnDate.setHours(returnDate.getHours() + 1); 
    const fine = 0; 

    const book = await Book.create({ name, author, takenOn, returnDate, fine });
    res.json({ message: 'Book borrowed successfully', book });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/return/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const returnDate = new Date();

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const timeDiff = returnDate - book.returnDate;
    const hoursLate = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60)));
    const fine = hoursLate * 10; 

    book.fine = fine;
    await book.save();

    res.json({ message: 'Book returned successfully', book });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;