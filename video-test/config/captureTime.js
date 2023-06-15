let captureTime = new Date();

export let YEAR = captureTime.getFullYear(); // 년도
export let MONTH = captureTime.getMonth() + 1; // 월
export let DATE = captureTime.getDate(); // 날짜

export var HOURS = ("0" + captureTime.getHours()).slice(-2);
export var MINUTES = ("0" + captureTime.getMinutes()).slice(-2);
export var SECONDS = ("0" + captureTime.getSeconds()).slice(-2);
