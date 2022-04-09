"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const LogsSchema = new mongoose_1.Schema({
    guildId: { type: String, required: true },
    action: { type: String, required: true },
    module: { type: String, required: true },
    timestamp: { type: String, required: true },
    user: {
        id: { type: String, required: true },
        username: { type: String, required: true },
        discriminator: { type: String, required: true },
        avatar: { type: String, required: false },
    },
});
exports.default = mongoose_1.default.model('logs', LogsSchema);
