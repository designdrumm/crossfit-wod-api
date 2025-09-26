import express from "express";
import { workoutController } from "../controllers/workoutController.js";
import { recordController } from "../controllers/recordController.js";

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
/**
 * @openapi
 * /api/v1/workouts/:workoutId:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: parameter
 *         name: workoutId
 *         schema:
 *           type: string
 *         description: The id of a workout. 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/workouts/:workoutId/records:
 *   get:
 *     tags:
 *       - Records
 *     parameters:
 *       - in: query
 *         name: record
 *         schema:
 *           type: string
 *         description: The record value.  
 *       - in: parameter
 *         name: workoutId
 *         schema:
 *           type: string
 *         description: The id of a workout. 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Record"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/workouts/:workoutId/records/:recordId:
 *   get:
 *     tags:
 *       - Records
 *     parameters:
 *       - in: parameter
 *         name: workoutId
 *         schema:
 *           type: string
 *         description: The id of a workout. 
 *       - in: parameter
 *         name: recordId
 *         schema:
 *           type: string
 *         description: The id of a workout record.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Record"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/members:
 *   get:
 *     tags:
 *       - Members
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         description: The gender of a member. 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Member"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/members/:memberId:
 *   get:
 *     tags:
 *       - Members
 *     parameters:
 *       - in: parameter
 *         name: memberId
 *         schema:
 *           type: string
 *         description: The id of a member. 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Member"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

// Custom made middlewares
//const authenticate = require("../../middlewares/authenticate");
//const authorize = require("../../middlewares/authorize");

const router = express.Router();

/* GET requests */

router.get("/", workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);

router.get("/:workoutId/records", recordController.getAllRecords);

router.get("/:workoutId/records/:recordId", recordController.getRecordForWorkout);

/* POST requests */

router.post("/", workoutController.createNewWorkout);
//router.post("/", authenticate, authorize, workoutController.createNewWorkout);

router.post("/:workoutId/records/:recordId", recordController.createNewWorkoutRecord);

/* PATCH requests */

router.patch("/:workoutId", workoutController.updateOneWorkout);

router.patch("/:workoutId/records/:recordId", recordController.updateWorkoutRecord);

/* DELETE requests */

router.delete("/:workoutId", workoutController.deleteOneWorkout);

router.delete("/:workoutId/records/:recordId", recordController.deleteWorkoutRecord);

export default router;
