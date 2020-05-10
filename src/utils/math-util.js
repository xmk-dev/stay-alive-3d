export const random = (min, max) => Math.random() * (max - min) + min;

export const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

export const round = (number, precision) => Number(number.toFixed(precision));
