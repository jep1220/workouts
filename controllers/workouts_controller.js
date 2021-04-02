const express = require("express");
const router = express.Router();
// Import the model (workouts.js) to use its database functions.
const workout = require("../models/workouts.js");

// Create all our routes and set up logic within those routes where required.

// Get workouts
router.get("/", async function(req, res) {
    const hbsObject = { workouts: await workout.selectAll() };
    res.render("index", hbsObject);
});

router.get("/api/workouts", async function(req, res) {
    try {
        const result = await workout.selectAll();
        res.json({ workouts: result });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

// Create a new workout
router.post("/api/workouts", async function(req, res) {
    try {
        const result = await workout.insertOne(
            [
                "workout_name", "crushed"
            ], [
                req.body.workout_name, req.body.crushed
            ]
        );
        // Send back the ID of the new workout
        res.json({ id: result.insertId });;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Crush a workout
router.put("/api/workouts/:id", async function(req, res) {
    const condition = "id = " + req.params.id;

    try {
        const result = await workout.updateOne({ crushed: req.body.crushed }, condition);
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete a workout
router.delete("/api/workouts/:id", async function(req, res) {
    const condition = "id = " + req.params.id;

    try {
        const result = await workout.deleteOne(condition)
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Export routes for server.js to use.
module.exports = router;