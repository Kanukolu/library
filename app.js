const express = require('express');
const app = express();
const PORT=3000
const bodyParser=require("body-parser")
app.use(bodyParser.json())

const libraryRoutes = require('./routes/libraryroutes');
app.use('/library', libraryRoutes); 



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});