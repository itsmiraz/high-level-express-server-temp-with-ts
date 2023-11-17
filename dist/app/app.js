"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use(express_1.default.text());
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use('/api/v1', courseRouter);
app.use('/api/v1/course', userRouter);
userRouter.get('/users/creat-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        succuss: true,
        message: "User is created successFully",
        data: user
    });
});
courseRouter.post('/createCourse', (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        succuss: true,
        message: "course is created successFully",
        data: course
    });
});
// MiddleWare
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.get('/', logger, (req, res) => {
});
app.post('/', logger, (req, res, next) => {
    try {
        // console.log(tst);
        res.send("Got Data");
    }
    catch (err) {
        next(err);
    }
});
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route Not Found"
    });
});
// globadl error handler
app.use((error, req, res, next) => {
    console.log(error);
    if (error) {
        res.status(400).json({
            succuss: false,
            message: "Something went wrong"
        });
    }
});
exports.default = app;
