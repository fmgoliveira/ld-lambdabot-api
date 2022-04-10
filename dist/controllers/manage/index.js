"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLevelsSettingsController = exports.getLevelsSettingsController = exports.postVerificationSettingsController = exports.getVerificationSettingsController = exports.postChatFilterSettingsController = exports.getChatFilterSettingsController = exports.postLoggingSettingsController = exports.getLoggingSettingsController = exports.postAltDetectionSettingsController = exports.getAltDetectionSettingsController = exports.postModerationSettingsController = exports.getModerationSettingsController = exports.postTicketsSettingsController = exports.getTicketsSettingsController = exports.postAutorolesSettingsController = exports.getAutorolesSettingsController = exports.postLeaveSettingsController = exports.getLeaveSettingsController = exports.postWelcomeSettingsController = exports.getWelcomeSettingsController = exports.postAdministrationSettingsController = exports.getAdministrationSettingsController = void 0;
const manage_1 = require("../../services/manage");
const functions_1 = require("../../utils/functions");
async function getAdministrationSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getAdministrationSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.getAdministrationSettingsController = getAdministrationSettingsController;
async function postAdministrationSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postAdministrationSettings)(guildId, req.body.data);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "administration");
    res.status(200).send(data);
}
exports.postAdministrationSettingsController = postAdministrationSettingsController;
async function getWelcomeSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getWelcomeSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.getWelcomeSettingsController = getWelcomeSettingsController;
async function postWelcomeSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postWelcomeSettings)(guildId, req.body.data);
    if (data?.error)
        return res.status(400).send(data?.error);
    if (!data?.guild || !data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "welcome");
    res.status(200).send(data);
}
exports.postWelcomeSettingsController = postWelcomeSettingsController;
async function getLeaveSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getLeaveSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.getLeaveSettingsController = getLeaveSettingsController;
async function postLeaveSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postLeaveSettings)(guildId, req.body.data);
    if (data?.error)
        return res.status(400).send(data?.error);
    if (!data?.guild || !data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "leave");
    res.status(200).send(data);
}
exports.postLeaveSettingsController = postLeaveSettingsController;
async function getAutorolesSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getAutorolesSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.getAutorolesSettingsController = getAutorolesSettingsController;
async function postAutorolesSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postAutorolesSettings)(guildId, req.body.data);
    if (data?.error)
        return res.status(400).send(data?.error);
    if (!data?.guild || !data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "autoroles");
    res.status(200).send(data);
}
exports.postAutorolesSettingsController = postAutorolesSettingsController;
async function getTicketsSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getTicketsSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.getTicketsSettingsController = getTicketsSettingsController;
async function postTicketsSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postTicketsSettings)(guildId, req.body.data);
    if (data?.error)
        return res.status(400).send(data?.error);
    if (!data?.guild || !data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "tickets");
    res.status(200).send(data);
}
exports.postTicketsSettingsController = postTicketsSettingsController;
async function getModerationSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getModerationSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "moderation");
    res.status(200).send(data);
}
exports.getModerationSettingsController = getModerationSettingsController;
async function postModerationSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postModerationSettings)(guildId, req.body.data);
    if (data?.error)
        return res.status(400).send(data?.error);
    if (!data?.guild || !data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.postModerationSettingsController = postModerationSettingsController;
async function getAltDetectionSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getAltDetectionSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "alt detection");
    res.status(200).send(data);
}
exports.getAltDetectionSettingsController = getAltDetectionSettingsController;
async function postAltDetectionSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postAltDetectionSettings)(guildId, req.body.data);
    if (data?.error)
        return res.status(400).send(data?.error);
    if (!data?.guild || !data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.postAltDetectionSettingsController = postAltDetectionSettingsController;
async function getLoggingSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getLoggingSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "logging");
    res.status(200).send(data);
}
exports.getLoggingSettingsController = getLoggingSettingsController;
async function postLoggingSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postLoggingSettings)(guildId, req.body.data);
    if (data?.error)
        return res.status(400).send(data?.error);
    if (!data?.guild || !data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.postLoggingSettingsController = postLoggingSettingsController;
async function getChatFilterSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getChatFilterSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "chat filter");
    res.status(200).send(data);
}
exports.getChatFilterSettingsController = getChatFilterSettingsController;
async function postChatFilterSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postChatFilterSettings)(guildId, req.body.data);
    if (data?.error)
        return res.status(400).send(data?.error);
    if (!data?.guild || !data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.postChatFilterSettingsController = postChatFilterSettingsController;
async function getVerificationSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getVerificationSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.getVerificationSettingsController = getVerificationSettingsController;
async function postVerificationSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postVerificationSettings)(guildId, req.body.data);
    if (data?.error)
        return res.status(400).send(data?.error);
    if (!data?.guild || !data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "verification");
    res.status(200).send(data);
}
exports.postVerificationSettingsController = postVerificationSettingsController;
async function getLevelsSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.getLevelsSettings)(guildId);
    if (!data)
        return res.status(404).send({ msg: "Guild not found" });
    res.status(200).send(data);
}
exports.getLevelsSettingsController = getLevelsSettingsController;
async function postLevelsSettingsController(req, res) {
    const guildId = req.params.guildId;
    if (!guildId)
        return res.status(404).send({ msg: "Guild not found" });
    const data = await (0, manage_1.postLevelsSettings)(guildId, req.body.data);
    if (data?.error)
        return res.status(400).send(data?.error);
    if (!data?.guild || !data)
        return res.status(404).send({ msg: "Guild not found" });
    await (0, functions_1.createActionLog)(guildId, req.user, "levels");
    res.status(200).send(data);
}
exports.postLevelsSettingsController = postLevelsSettingsController;
