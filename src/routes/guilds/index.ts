import { Router } from "express";
import { getChannels, getGuild, getGuildsController } from "../../controllers/guilds";
import { isAuthenticated, storedGuildSetup } from "../../utils/middlewares";

const router = Router();

router.get('/', isAuthenticated, getGuildsController);

router.get('/:guildId', isAuthenticated, storedGuildSetup, getGuild);

router.get('/:guildId/channels', isAuthenticated, storedGuildSetup, getChannels);

export default router;