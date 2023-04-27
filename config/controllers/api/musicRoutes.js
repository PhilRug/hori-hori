const router = require('express').Router();
const { Music } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newMusic = await Music.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMusic);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const musicData = await Music.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!musicData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(musicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
