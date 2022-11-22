const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

// o: do you use / need this route?
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// o: do you use / need this route?
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ["id", "username"],
    });
    if (user) res.json(user);
    else res.json({ error: "User not found" });
  } catch (err) {
    next(err);
  }
});

