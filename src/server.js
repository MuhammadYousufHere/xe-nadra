const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('../routes');
dotenv.config();

//
const app = express();
const port = process.env.PORT;

//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../client/build/index.html'));
  });
}

//
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' });
});

app.use('/users', router);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
