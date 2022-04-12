import { Router } from "express";
import { getBotStats } from "../../controllers/bot";

const router = Router();

router.get('/stats', getBotStats);

export default router;