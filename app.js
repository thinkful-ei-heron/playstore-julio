const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));
const store = require('./playstore.js');

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;
  let results = store;
  if (sort) {
    if (!['rating', 'app'].includes(sort.toLowerCase())) {
      return res.status(400).send('Query string must include : rating or app');
    }
    results.sort((a, b) => {
      return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
    });
  }
  if (genres) {
    if (
      !['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(
        genres.toLowerCase(),
      )
    ) {
      return res.status(400).send('Genre selection invalid');
    }
  }
  if (genres) {
    results = store.filter((item) =>
      item.Genres.toLowerCase().includes(genres.toLowerCase()),
    );
  }
  res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});
