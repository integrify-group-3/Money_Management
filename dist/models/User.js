"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    id: String,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    registeredAt: {
        type: Date,
        default: Date.now,
    },
    resetLink: {
        type: String,
        default: ''
    },
    calendar: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'calendar',
    },
});
exports.default = mongoose_1.default.model('user', userSchema);
//# sourceMappingURL=User.js.map