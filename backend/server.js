const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.use(express.json());
app.use(cors({ origin: '*' }));

const shoesRoutes = require('./routes/shoe.route');
app.use('/', shoesRoutes);


app.listen(port, () => {
  console.log(`Serveur started on ${port}`);
});
