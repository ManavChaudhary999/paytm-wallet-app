require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const rootRouter = require('./routes');

const app = express();
// Middlewares
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', rootRouter);


app.get('/', (req, res) => {
  res.send('Hello Express app!');
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});