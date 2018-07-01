var models = require("../models");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  models.sequelize
    .query(
      `SELECT
          name,
          birth_date,
          EXTRACT(YEAR FROM age(birth_date)) AS age,
          date_part(DAY FROM brith_date) AS day_b,
          date_part(MONTH FROM birth_date) AS month_b,
          CONCAT(day_b, '-', month_b) as fecha
      FROM
          "People"
      ORDER BY
          fecha DESC`,
      {
        model: models.Person
      }
    )
    .then(function(people) {
      res.render("index", { title: "Celebrities, ordered proximity", people: people });
    });
});

module.exports = router;
