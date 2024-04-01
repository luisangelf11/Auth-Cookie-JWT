import { Router } from "express";
import { createTask, getTasks } from "../controllers/task.controller";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.post('/tasks', validateToken, createTask);

router.get('/tasks', validateToken, getTasks);

export default router;