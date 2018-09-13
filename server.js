const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

// app.use() // To register middlewarw
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error) console.log('Unable to connect server.log.');
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintanance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'Welcome to the site!'
  });
});

app.get('/about', (req, res) => {
  // res.send('<h1>about us</h1>');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error'
  });
});

app.listen(3000, (error) => {
  if (error) throw error;
  console.log(`Server is running on port 3000.`);
});
