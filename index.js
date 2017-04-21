var express = require('express');
var app = express();

app.set('view engine', 'pug');

app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));

app.use('/graphql', require('./models/graph.js'));

app.get('/', require('./routes/index'));
app.get('/event/:id', require('./routes/event'));
app.get('/about', require('./routes/about'));

app.post('/upload', require('./routes/upload').upload);
app.delete('/rm_av', require('./routes/upload').remove);

app.use(function(req, res, next) {
  if (req.url == '/forbidden') {
    next(new Error("wops, denied"));
  } else {
    next();
  }
});

app.use(function(req, res){
  res.status(404).render('error', { title: 'Events. The easy service to share your events', message: 'Page Not Found' })
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('error', { title: 'Events. The easy service to share your events', message: 'Sorry. Something broke!' })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});