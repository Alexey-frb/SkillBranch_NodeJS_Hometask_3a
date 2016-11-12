import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';

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

app.get('/task3a', (req, res) => {
  res.json(pc);
});

app.get('/task3a/board', (req, res) => {
  res.json(pc.board);
});

app.get('/task3a/board/vendor', (req, res) => {
  res.json(pc.board.vendor);
});

app.get('/task3a/board/model', (req, res) => {
  res.json(pc.board.model);
});

app.get('/task3a/board/cpu', (req, res) => {
  res.json(pc.board.cpu);
});

app.get('/task3a/board/cpu/model', (req, res) => {
  res.json(pc.board.cpu.model);
});

app.get('/task3a/board/cpu/hz', (req, res) => {
  res.json(pc.board.cpu.hz);
});

app.get('/task3a/board/image', (req, res) => {
  res.json(pc.board.image);
});

app.get('/task3a/board/video', (req, res) => {
  res.json(pc.board.video);
});

app.get('/task3a/ram', (req, res) => {
  res.json(pc.ram);
});

app.get('/task3a/ram/vendor', (req, res) => {
  res.json(pc.ram.vendor);
});

app.get('/task3a/ram/volume', (req, res) => {
  res.json(pc.ram.volume);
});

app.get('/task3a/ram/pins', (req, res) => {
  res.json(pc.ram.pins);
});

app.get('/task3a/os', (req, res) => {
  res.json(pc.os);
});

app.get('/task3a/floppy', (req, res) => {
  res.json(pc.floppy);
});

app.get('/task3a/hdd', (req, res) => {
  res.json(pc.hdd);
});

app.get('/task3a/hdd/:id', (req, res) => {
  const id = req.params.id;
  const hdds = pc.hdd;

  if (id >= 0 && id < hdds.length) {
    res.json(hdds[id]);
  } else {
    res.status(404).send('Not found');
  }
});

app.get('/task3a/hdd/:id/vendor', (req, res) => {
  const id = req.params.id;
  const hdds = pc.hdd;

  if (id >= 0 && id < hdds.length) {
    res.json(hdds[id].vendor);
  } else {
    res.status(404).send('Not found');
  }
});

app.get('/task3a/hdd/:id/size', (req, res) => {
  const id = req.params.id;
  const hdds = pc.hdd;

  if (id >= 0 && id < hdds.length) {
    res.json(hdds[id].size);
  } else {
    res.status(404).send('Not found');
  }
});

app.get('/task3a/hdd/:id/volume', (req, res) => {
  const id = req.params.id;
  const hdds = pc.hdd;

  if (id >= 0 && id < hdds.length) {
    res.json(hdds[id].volume);
  } else {
    res.status(404).send('Not found');
  }
});

app.get('/task3a/monitor', (req, res) => {
  res.json(pc.monitor);
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

app.use((req, res) => {
  res.status(404).send('Not found');
  return;
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
