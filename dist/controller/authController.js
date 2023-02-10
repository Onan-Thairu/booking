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
exports.loginUser = exports.registerUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const config_1 = require("../config");
const helpers_1 = require("../helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = (0, uuid_1.v4)();
            const { Name, Email, Password } = req.body;
            const { error } = helpers_1.validationSchema.validate(req.body);
            if (error) {
                return res.status(422).json(error.details[0].message);
            }
            const pool = yield mssql_1.default.connect(config_1.sqlConfig);
            const hashedPassword = yield bcrypt_1.default.hash(Password, 10);
            yield pool.request()
                .input('id', id)
                .input('name', Name)
                .input('email', Email)
                .input('password', hashedPassword)
                .execute('registerUser');
            return res.status(201).json({ message: 'User Registered' });
        }
        catch (error) {
            return res.status(500).json(error);
        }
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Email, Password } = req.body;
            const { error } = helpers_1.loginSchema.validate(req.body);
            if (error) {
                return res.status(422).json(error.details[0].message);
            }
            const pool = yield mssql_1.default.connect(config_1.sqlConfig);
            const user = yield (yield pool.request().input('email', Email).execute('getUserByEmail')).recordset;
            if (!user[0]) {
                return res.status(404).json({ error: "User Not Found" });
            }
            const valid = yield bcrypt_1.default.compare(Password, user[0].Password);
            if (!valid) {
                return res.status(404).json({ error: "User Not Found" });
            }
            return res.status(200).json({ message: "User Logged in!" });
        }
        catch (error) {
            return res.status(500).json(error);
        }
    });
}
exports.loginUser = loginUser;
