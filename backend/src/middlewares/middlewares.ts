import {Express} from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

export const middlewares = (app: Express) => {
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(express.urlencoded({extended: true}));
};