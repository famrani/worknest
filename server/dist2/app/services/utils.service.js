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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = exports.timer = exports.AUTHORIZE_URI = exports.TOKEN_URI = void 0;
exports.TOKEN_URI = 'https://connect.stripe.com/oauth/token';
exports.AUTHORIZE_URI = 'https://connect.stripe.com/oauth/authorize';
var timer = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
exports.timer = timer;
var Vonage = require('@vonage/server-sdk').Vonage;
var vonage = new Vonage({
    apiKey: "cc59b4d3",
    apiSecret: "yF2pFHuyZoJrHQGh"
});
var UtilsService = /** @class */ (function () {
    function UtilsService() {
        this.adnStoreId = 0;
        this.platformEnv = "dev";
        this.firebaseAdmin = require('firebase-admin');
        this.serviceAccountFile = "";
        this.databaseURL = "";
        this.qs = require('querystring');
        this.backendFBstoreId = '1000';
        this.backendFBstoreId2 = '2001';
    }
    UtilsService.prototype.fileToArray = function (fileName, arr) {
        return new Promise(function (resolve, reject) {
            var i = 0;
            var currentDir = process.cwd();
            try {
                arr = require(currentDir + "/" + fileName);
                resolve(arr);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    UtilsService.prototype.readConfig = function (configFile, env) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fileToArray(configFile, _this.backendConfig).then(function (data) {
                if (!env) {
                    env = data['application'].platform;
                    _this.platformEnv = env;
                }
                _this.backendUrl = data[env]["backendUrl"];
                _this.serverPort = data[env]["serverPort"];
                _this.serviceAccountFile = process.cwd() + "/dist2/config/" + data[env]["serviceAccount"];
                _this.databaseURL = data[env]["firebaseMasterConfig"]["databaseURL"];
                _this.stripeClientId = data[env]["stripeConfig"]["CLIENT_ID"];
                _this.stripePublicKey = data[env]["stripeConfig"]["STRIPE_API_PUBLIC_KEY"];
                _this.stripeSecretKey = process.env.STRIPE_SECRET_KEY;
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    UtilsService.prototype.getParams = function () {
        var _this = this;
        process.argv.forEach(function (val, index, array) {
            _this.params = array.slice();
        });
        if (this.params.length > 2) {
            switch (this.params[2]) {
                case "dev":
                case "test":
                case "demo":
                case "prod":
                    this.platformEnv = this.params[2];
                    break;
                default:
                    this.platformEnv = undefined;
            }
        }
        else {
            this.platformEnv = undefined;
        }
    };
    UtilsService.prototype.setRoutes = function (router) {
        router.get('/utils/getenv', function (req, res) {
            var status = 200;
            var sessionData = req.session.kamli;
            if (sessionData === undefined) {
                sessionData = {};
            }
            res.json(sessionData).status(status);
        });
    };
    UtilsService.prototype.sendSMS = function (to, from, text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vonage.sms.send({ to: to, from: from, text: text })
                            .then(function (resp) { console.log('Message sent successfully'); console.log(resp); })
                            .catch(function (err) { console.log('There was an error sending the messages.'); console.error(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UtilsService.prototype.objectToArray = function (objectInput) {
        var keyI;
        var ArrayOutput = [];
        try {
            for (keyI in objectInput) {
                objectInput[keyI]["key"] = keyI;
                ArrayOutput.push(objectInput[keyI]);
            }
        }
        catch (e) {
            ArrayOutput = objectInput;
        }
        return ArrayOutput;
    };
    return UtilsService;
}());
exports.UtilsService = UtilsService;
