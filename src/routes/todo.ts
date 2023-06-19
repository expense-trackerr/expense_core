import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    todos: [
      {
        id: 1,
        title: 'Todo One',
      },
      {
        id: 2,
        title: 'Todo Two',
      },
      {
        id: 3,
        title: 'Todo Three',
      },
    ],
  });
});

module.exports = router;
