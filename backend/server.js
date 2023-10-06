const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.use(express.json());
app.use(cors({ origin: '*' }));

const shoesRoute = require('./routes/shoe.route');
app.use('/', shoesRoute);

const usersRoute = require('./routes/user.route');
app.use('/', usersRoute);



app.listen(port, () => {
  console.log(`Serveur started on ${port}`);
});
