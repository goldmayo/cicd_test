const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const myPageRoutes = require('./routes/myPageRoutes');
const initModels = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3030',
  method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use('/users', userRoutes);
app.use('/my-page', myPageRoutes);
app.use('/oauth', authRoutes);

initModels();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;