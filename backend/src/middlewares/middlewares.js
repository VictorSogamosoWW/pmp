"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const middlewares = (app) => {
    app.use(express_1.default.json());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.middlewares = middlewares;
