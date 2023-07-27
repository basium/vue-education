const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { page: 'home' });
});

app.get('/about', (req, res) => {
  res.render('index', { page: 'about' });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
