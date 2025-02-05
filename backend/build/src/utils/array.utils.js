"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomElement = void 0;
const getRandomElement = (array) => {
    if (array.length === 0)
        return undefined;
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};
exports.getRandomElement = getRandomElement;
