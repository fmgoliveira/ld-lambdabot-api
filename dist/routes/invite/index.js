"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/redirect', (req, res) => res.redirect(`${process.env.DASHBOARD_DOMAIN}/manage/home`));
exports.default = router;
