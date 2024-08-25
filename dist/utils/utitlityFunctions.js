"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReward = void 0;
const constants_1 = require("./constants");
const getReward = (userCount) => {
    if (constants_1.offer[userCount]) {
        return constants_1.offer[userCount];
    }
    else {
        return "Mobile Case";
    }
};
exports.getReward = getReward;
