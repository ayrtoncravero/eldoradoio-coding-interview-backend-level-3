"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../controllers/item.controller");
const router = (0, express_1.Router)();
const itemController = new item_controller_1.ItemController();
router.post('/', itemController.create.bind(itemController));
exports.default = router;
