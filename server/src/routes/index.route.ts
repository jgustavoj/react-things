import express from "express";
import userRoutes from "./user.route";

const router = express.Router();

// This become a prefix for every endpoint -> base/api/users/{whatever we add in the user.route.ts}
router.use("/users", userRoutes);

export default router;
