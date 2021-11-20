const express = require('express');

const connectDB = require('./configs/connectDB');
const router = require('./routes/routes');
const errorHandling = require('./middlewares/errHandling');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandling);

app.listen(port, hostname, (req, res) => {
  console.log(`Server Sedang Berjalan http://${hostname}:${port}`);
})