"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB Database.'))
    .catch((err) => console.log(err));
