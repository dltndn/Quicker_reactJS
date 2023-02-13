"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = '3100';
console.log("test");
app.get('/', (req, res, next) => {
    res.send('main!');
});
app.get('/welcome', (req, res, next) => {
    res.send('welcome!');
});
app.listen(port, () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: ${port}
  ################################################
`);
});
