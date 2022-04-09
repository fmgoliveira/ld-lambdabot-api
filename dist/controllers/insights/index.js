"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogsController = exports.getMembersController = exports.getDashboardController = void 0;
const insights_1 = require("../../services/insights");
async function getDashboardController(req, res) {
    const guildId = req.params.guildId;
    const data = await (0, insights_1.getChartsData)(guildId);
    res.status(200).send(data);
}
exports.getDashboardController = getDashboardController;
async function getMembersController(req, res) {
    const guildId = req.params.guildId;
    const data = await (0, insights_1.getMembers)(guildId);
    res.status(200).send(data);
}
exports.getMembersController = getMembersController;
async function getLogsController(req, res) {
    const guildId = req.params.guildId;
    const data = await (0, insights_1.getLogs)(guildId);
    res.status(200).send(data);
}
exports.getLogsController = getLogsController;
