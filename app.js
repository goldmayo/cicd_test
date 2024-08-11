const express = require('express');
// const https = require('https');
// const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const myPageRoutes = require('./routes/myPageRoutes');
const initModels = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// const sslOptions = {
//   key: fs.readFileSync('/etc/ssl/private/privkey.pem'),
//   cert: fs.readFileSync('/etc/ssl/certs/fullchain.pem'),
// };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3030',
  method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.get('/', (req, res) => {
  res.status(200).send('OK');
});
app.use('/users', userRoutes);
app.use('/my-page', myPageRoutes);
app.use('/oauth', authRoutes);

initModels();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // HTTPS 서버 시작
// https.createServer(sslOptions, app).listen(443, () => {
//   console.log('HTTPS Server running on port 443');
// });

module.exports = app;
