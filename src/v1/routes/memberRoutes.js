import express from "express";
import { memberController } from "../controllers/memberController.js";

// Custom made middlewares
//const authenticate = require("../../middlewares/authenticate");
//const authorize = require("../../middlewares/authorize");

const router = express.Router();

/* GET requests */

router.get("/", memberController.getAllMembers);

router.get("/:memberId", memberController.getOneMember);

/* POST requests */

router.post("/", memberController.createNewMember);
//router.post("/", authenticate, authorize, memberController.createNewMember);

/* PATCH requests */

router.patch("/:memberId", memberController.updateOneMember);

/* DELETE requests */

router.delete("/:memberId", memberController.deleteOneMember);

export default router;
