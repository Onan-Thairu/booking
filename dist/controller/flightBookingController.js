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
exports.cancelBooking = exports.updateBooking = exports.getOneBooking = exports.addBooking = exports.getBookings = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const config_1 = require("../config");
const helpers_1 = require("../helpers");
// Get all bookings
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const bookings = yield (yield pool.request().execute('getFlights')).recordset;
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(404).json(error.message);
    }
});
exports.getBookings = getBookings;
// Add a booking
function addBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = (0, uuid_1.v4)();
            const { Name, Email, Destination, TravelDate } = req.body;
            const { error } = helpers_1.bookingSchema.validate(req.body);
            if (error) {
                return res.status(422).json(error.message);
            }
            const pool = yield mssql_1.default.connect(config_1.sqlConfig);
            yield pool.request()
                .input('id', id)
                .input('name', Name)
                .input('email', Email)
                .input('destination', Destination)
                .input('date', TravelDate)
                .execute('insertOrUpdate');
            return res.status(201).json({ message: "Booking Added" });
        }
        catch (error) {
            return res.status(422).json(error);
        }
    });
}
exports.addBooking = addBooking;
// Get one booking
const getOneBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const booking = yield (yield pool.request()
            .input('id', id)
            .execute('getFlightBookings')).recordset[0];
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        return res.status(200).json(booking);
    }
    catch (error) {
        return res.status(422).json(error);
    }
});
exports.getOneBooking = getOneBooking;
// Update Booking
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Email, Destination, TravelDate } = req.body;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const booking = yield (yield pool.request()
            .input('id', req.params.id)
            .execute('getFlightBookings')).recordset[0];
        if (booking) {
            yield pool.request()
                .input('id', req.params.id)
                .input('name', Name)
                .input('email', Email)
                .input('destination', Destination)
                .input('date', TravelDate)
                .execute('insertOrUpdate');
            return res.status(201).json({ message: "Booking updated" });
        }
        return res.status(404).json({ error: "Booking Not Found" });
    }
    catch (error) {
        return res.status(422).json(error);
    }
});
exports.updateBooking = updateBooking;
// Delete Booking
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const booking = yield (yield pool.request().input('id', req.params.id).execute('getFlightBookings')).recordset[0];
        if (booking) {
            yield pool.request().input('id', req.params.id).execute('deleteFlightBooking');
            return res.status(204).json({ message: "Booking Deleted" });
        }
        return res.status(404).json({ message: "Booking Does Not Exist" });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.cancelBooking = cancelBooking;
