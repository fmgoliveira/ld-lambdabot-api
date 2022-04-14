import { Router } from "express";
import { getCategories, getChannels, getGuild, getGuildsController, getRoles } from "../../controllers/guilds";
import { isAuthenticated, storedGuildSetup } from "../../utils/middlewares";

const router = Router();

router.get('/', isAuthenticated, getGuildsController);

router.get('/:guildId', isAuthenticated, storedGuildSetup, getGuild);

router.get('/:guildId/channels', isAuthenticated, storedGuildSetup, getChannels);

router.get('/:guildId/categories', isAuthenticated, storedGuildSetup, getCategories);

router.get('/:guildId/roles', isAuthenticated, storedGuildSetup, getRoles);

export default router;