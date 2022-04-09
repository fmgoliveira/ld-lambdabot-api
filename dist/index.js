"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
const createApp_1 = require("./utils/createApp");
const client_1 = tslib_1.__importDefault(require("./client"));
require("./database");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3001;
async function main() {
    console.log(`Running in ${process.env.ENV} mode.`);
    try {
        const app = (0, createApp_1.createApp)();
        app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
    catch (err) {
        console.log(err);
    }
    try {
        client_1.default.init();
    }
    catch (err) {
        console.log(err);
    }
}
main();
