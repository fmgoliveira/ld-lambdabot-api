import { Router } from "express";
import { getDashboardController, getLogsController, getMembersController } from "../../controllers/insights";
import { isAllowed, isAuthenticated, storedGuildSetup } from "../../utils/middlewares";

const router = Router();

router.get('/:guildId/dashboard', isAuthenticated, isAllowed, storedGuildSetup, getDashboardController);

router.get('/:guildId/members', isAuthenticated, isAllowed, storedGuildSetup, getMembersController);

router.get('/:guildId/logs', isAuthenticated, isAllowed, storedGuildSetup, getLogsController);

export default router;