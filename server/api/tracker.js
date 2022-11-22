const router = require("express").Router();

const {
  models: { Tracker, Recipes, User, recipeTracker },
} = require("../db");

const padTo2Digits = (num) => {
  return num.toString().padStart(2, 0);
};

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

router.get("/", async (req, res, next) => {
  const token = req.headers.authorization;
  const user = await User.findByToken(token);
  if (user) {
    try {
      await Tracker.findOrCreate({
        where: {
          date: formatDate(new Date()),
          userId: user.id,
        },
      });

      const tracker = await Tracker.findAll({
        where: { userId: user.id },
        include: [Recipes],
      });

      res.json(tracker);
    } catch (error) {
      next(error);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  const token = req.headers.authorization;
  const user = await User.findByToken(token);
  if (user) {
    try {
      const tracker = await Tracker.findOne({
        where: {
          id: req.params.id,
          userId: user.id,
        },
        include: [Recipes],
      });
      const newTracker = await Tracker.findOne({
        where: {
          date: tracker.date,
          id: req.params.id,
          userId: user.id,
        },
        include: [Recipes],
      });
      // o: remove if this api route works as intended
      console.log(newTracker);
      res.json(newTracker);
    } catch (error) {
      next(error);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  const token = req.headers.authorization;
  const user = await User.findByToken(token);
  if (user) {
    try {
      const { id, calories, protein, carbs, fat, water } = req.body.newFood;
      const tracker = await Tracker.findByPk(req.params.id, {
        include: { model: Recipes },
      });
      await recipeTracker.findOrCreate({
        where: { trackerId: tracker.id, recipeId: id },
      });
      await tracker.increment({
        totalCalories: Number(calories),
        totalProtein: Number(protein),
        totalCarbs: Number(carbs),
        totalFat: Number(fat),
        waterIntake: 0,
      });

      res.json(tracker);
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
