import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';
import _ from 'lodash';

const app = express();
app.use(cors());

const baseUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(baseUrl)
  .then(async (response) => {
    const result = await response.json();
    pc = result;
  })
  .catch((err) => {
    console.log('Чтото пошло не так:', err);
  });

app.get('/task3a/volumes', (req, res) => {
  const hdds = pc.hdd;
  let hddC = 0;
  let hddD = 0;

  hdds.forEach((hdd) => {
    switch (hdd.volume) {
      case 'C:':
        hddC += hdd.size;
        break;
      case 'D:':
        hddD += hdd.size;
        break;
      default:
        hddC = 0;
        hddD = 0;
    }
  });

  res.json({
    'C:': `${hddC}B`,
    'D:': `${hddD}B`,
  });
});

app.get('/task3a/:id1?/:id2?/:id3?', (req, res) => {
  const id1 = req.params.id1;
  const id2 = req.params.id2;
  const id3 = req.params.id3;
  let result;

  try {
    if (id3 != null) {
      result = _.result(_.result(_.result(pc, [id1]), [id2]), [id3], 'Not found');
    } else if (id2 != null) {
      result = _.result(_.result(pc, [id1]), [id2], 'Not found');
    } else if (id1 != null) {
      result = _.result(pc, [id1], 'Not found');
    } else {
      result = pc;
    }

    if (result !== 'Not found') {
      res.json(result);
    } else {
      res.status(404).send('Not found');
    }
  } catch (e) {
    res.status(404).send('Not found');
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
