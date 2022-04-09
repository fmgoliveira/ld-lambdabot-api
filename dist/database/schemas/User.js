"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    discordId: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true,
        unique: true,
    },
    discordUsername: {
        type: mongoose_1.default.SchemaTypes.String,
        default: "",
    },
    discordDiscriminator: {
        type: mongoose_1.default.SchemaTypes.String,
        default: "",
    },
    discordAvatar: {
        type: mongoose_1.default.SchemaTypes.String,
        default: "",
    },
    email: {
        type: mongoose_1.default.SchemaTypes.String,
        default: "",
    },
    blacklisted: {
        type: mongoose_1.default.SchemaTypes.Boolean,
        default: false,
    },
    acceptedPolicy: {
        type: mongoose_1.default.SchemaTypes.Boolean,
        default: true,
    },
    voted: {
        type: mongoose_1.default.SchemaTypes.Boolean,
        default: false,
    },
    voteAmount: {
        type: mongoose_1.default.SchemaTypes.Number,
        default: 0,
    },
    accessToken: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true,
    },
    refreshToken: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true,
    }
});
exports.default = mongoose_1.default.model('users', UserSchema);
