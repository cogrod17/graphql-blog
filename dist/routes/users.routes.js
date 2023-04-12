"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const middleware_1 = require("../middleware");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
exports.UserRouter = router;
router.get("/users", middleware_1.auth.required, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.find();
    return res.send({ users });
}));
router.post("/user/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new models_1.User();
        user.email = req.body.email;
        user.setPassword(req.body.password);
        yield user.save();
        return res.send(Object.assign({}, user.forClient()));
    }
    catch (e) {
        return res.status(500).send();
    }
}));
router.post("/user/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password)
        return res.status(422).send({ error: "email and password required" });
    passport_1.default.authenticate("local", { session: false }, (err, user, info) => {
        if (err)
            return res.status(400).send({ error: err });
        // const
        if (user)
            return res.send({ user, token: user.generateJWT() });
        return res.status(400).send(info);
    })(req, res, next);
}));
router.get("/user", middleware_1.auth.required, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const user: IUser | null = await User.findById(req.auth?.id);
    const user = yield models_1.User.findById("asdf");
    if (!user)
        return res.status(404).send();
    return res.send(Object.assign({}, user.forClient()));
}));
