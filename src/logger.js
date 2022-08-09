"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
const winston_1 = __importStar(require("winston"));
const env_1 = require("./env");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
exports.createLogger = ({ dirname, level }) => {
    var transport = new winston_daily_rotate_file_1.default({
        dirname,
        filename: "checkup.log",
        datePattern: "YYYY",
        zippedArchive: true,
        maxSize: env_1.isDev ? "5k" : "5m",
        maxFiles: 3,
    });
    const winstonLogger = winston_1.default.createLogger({
        level: level || (env_1.isDev ? "verbose" : "info"),
        format: winston_1.format.combine(winston_1.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }), winston_1.default.format.simple()),
        // defaultMeta: { service: 'user-service' },
        transports: [
            env_1.isDev ? new winston_1.default.transports.Console() : null,
            // new winston.transports.File({ filename: 'error.log', level: 'error' }),
            transport,
        ].filter((i) => !!i),
    });
    const logger = ({ level, message, tags, processName }) => {
        const meta = { processName };
        if (tags && tags.length)
            meta.tags = tags;
        winstonLogger.log(level, message, meta);
    };
    return logger;
};
//# sourceMappingURL=logger.js.map