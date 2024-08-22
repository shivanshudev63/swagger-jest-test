const express = require("express");
const router = express.Router();
var data = require("./data");
router.use((req, res, next) => {
  console.log("***************Telecom Service Application*******************");
  console.log(
    "****************************************************************"
  );
  console.log(new Date());
  console.log("*************************************************************");
  next();
});

/**
 * @swagger
 * /plan:
 *   get:
 *     summary: Get list of plans
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             plan:
 *               message: List of plans retrieved successfully
 */

router.get("/plan", (req, res) => {
  res.send(data);
});

/**
 * @swagger
 * /plan:
 *   post:
 *     summary: Save Plan
 *     requestBody:
 *       description: Save Plan
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *                 plan_name:
 *                   type: string
 *                 description:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             plan:
 *               message: List of plans retrieved successfully
 */

router.post("/plan", (req, res) => {
  data.push(req.body);
  res.send("plan added successfully");
});
router.put("/plan", (req, res) => {
  const old_data = data.filter((e) => e.plan_name != req.body.plan_name);
  old_data.push(req.body);
  data = old_data;
  res.send("data updated");
});
router.delete("/plan", (req, res) => {
  const old_data = data.filter((e) => e.plan_name != req.body.plan_name);
  data = old_data;
  res.send("data updated");
});

module.exports = router;
