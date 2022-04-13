import { Router } from "express";
import {
  getAdministrationSettingsController,
  getAltDetectionSettingsController,
  getChatFilterSettingsController,
  getLevelsSettingsController,
  getLoggingSettingsController,
  getModerationSettingsController,
  getTicketsSettingsController,
  getVerificationSettingsController,
  getWelcomeSettingsController,
  postAdministrationSettingsController,
  postAltDetectionSettingsController,
  postAutorolesSettingsController,
  postChatFilterSettingsController,
  postLeaveSettingsController,
  postLevelsSettingsController,
  postLoggingSettingsController,
  postModerationSettingsController,
  postTicketsSettingsController,
  postVerificationSettingsController,
  postWelcomeSettingsController,
} from "../../controllers/manage";
import { isAllowed, isAuthenticated, storedGuildSetup } from "../../utils/middlewares";

const router = Router();

router.get('/:guildId/administration', isAuthenticated, isAllowed, storedGuildSetup, getAdministrationSettingsController);
router.post('/:guildId/administration', isAuthenticated, isAllowed, storedGuildSetup, postAdministrationSettingsController);

router.get('/:guildId/welcome', isAuthenticated, isAllowed, storedGuildSetup, getWelcomeSettingsController);
router.post('/:guildId/welcome', isAuthenticated, isAllowed, storedGuildSetup, postWelcomeSettingsController);
router.post('/:guildId/leave', isAuthenticated, isAllowed, storedGuildSetup, postLeaveSettingsController);
router.post('/:guildId/autoroles', isAuthenticated, isAllowed, storedGuildSetup, postAutorolesSettingsController);

router.get('/:guildId/tickets', isAuthenticated, isAllowed, storedGuildSetup, getTicketsSettingsController);
router.post('/:guildId/tickets', isAuthenticated, isAllowed, storedGuildSetup, postTicketsSettingsController);

router.get('/:guildId/moderation', isAuthenticated, isAllowed, storedGuildSetup, getModerationSettingsController);
router.post('/:guildId/moderation', isAuthenticated, isAllowed, storedGuildSetup, postModerationSettingsController);

router.get('/:guildId/alt-detection', isAuthenticated, isAllowed, storedGuildSetup, getAltDetectionSettingsController);
router.post('/:guildId/alt-detection', isAuthenticated, isAllowed, storedGuildSetup, postAltDetectionSettingsController);

router.get('/:guildId/logging', isAuthenticated, isAllowed, storedGuildSetup, getLoggingSettingsController);
router.post('/:guildId/logging', isAuthenticated, isAllowed, storedGuildSetup, postLoggingSettingsController);

router.get('/:guildId/chat-filter', isAuthenticated, isAllowed, storedGuildSetup, getChatFilterSettingsController);
router.post('/:guildId/chat-filter', isAuthenticated, isAllowed, storedGuildSetup, postChatFilterSettingsController);

router.get('/:guildId/verification', isAuthenticated, isAllowed, storedGuildSetup, getVerificationSettingsController);
router.post('/:guildId/verification', isAuthenticated, isAllowed, storedGuildSetup, postVerificationSettingsController);

router.get('/:guildId/levels', isAuthenticated, isAllowed, storedGuildSetup, getLevelsSettingsController);
router.post('/:guildId/levels', isAuthenticated, isAllowed, storedGuildSetup, postLevelsSettingsController);

export default router;