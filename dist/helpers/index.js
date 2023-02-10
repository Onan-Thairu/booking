"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.validationSchema = exports.bookingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bookingSchema = joi_1.default.object({
    Name: joi_1.default.string().required(),
    Email: joi_1.default.string().required().email().messages({
        'string.empty': 'Please add a email',
        'string.email': 'Not a valid email'
    }),
    Destination: joi_1.default.string().required(),
    TravelDate: joi_1.default.string().required(),
});
exports.validationSchema = joi_1.default.object({
    Name: joi_1.default.string().required(),
    Email: joi_1.default.string().required().email().messages({
        'string.empty': 'Please add an email',
        'string.email': 'Not a valid email'
    }),
    Password: joi_1.default.string().required()
    // .pattern(new RegExp('/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/'))
});
exports.loginSchema = joi_1.default.object({
    Email: joi_1.default.string().required().email().messages({
        'string.empty': 'Please add an email',
        'string.email': 'Not a valid email'
    }),
    Password: joi_1.default.string().required()
});
