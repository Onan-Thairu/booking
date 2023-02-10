"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Booking = void 0;
class Booking {
    constructor(id, Name, Email, Destination, TravelDate) {
        this.id = id;
        this.Name = Name;
        this.Email = Email;
        this.Destination = Destination;
        this.TravelDate = TravelDate;
    }
}
exports.Booking = Booking;
class User {
    constructor(id, Name, Email, Role, Password) {
        this.id = id;
        this.Name = Name;
        this.Email = Email;
        this.Role = Role;
        this.Password = Password;
    }
}
exports.User = User;
