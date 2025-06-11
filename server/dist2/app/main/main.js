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
exports.MainComponent = void 0;
var dotenv_1 = require("dotenv");
var firebase_service_1 = require("../services/firebase.service");
var firebase_service_2 = require("../services/firebase.service"); // <== your updated store
var utils_service_1 = require("../services/utils.service");
var webServer_component_1 = require("../components/webServer.component");
var stripeAdn_1 = require("../services/stripeAdn");
var auth_1 = require("firebase-admin/auth");
(0, dotenv_1.config)(); // Load .env file
var MainComponent = /** @class */ (function () {
    function MainComponent() {
        this.backendFbObjects = [
            firebase_service_1.OBJECTNAME.wnUsers,
            firebase_service_1.OBJECTNAME.wnLocations,
            firebase_service_1.OBJECTNAME.wnBookings,
        ];
        this.utilSvc = new utils_service_1.UtilsService();
        this.storeDbSvc = new firebase_service_2.StoreDbService(this.utilSvc);
        this.stripeSvc = new stripeAdn_1.StripeService();
        this.webServerComponent = new webServer_component_1.WebServerComponent(this.utilSvc, this.stripeSvc);
        this.utilSvc.getParams();
        this.initBackend();
    }
    MainComponent.prototype.initBackend = function (platform_1) {
        return __awaiter(this, arguments, void 0, function (platform, backendFbObjects) {
            var configData, temp, temptemp, tt, temp1, error_1;
            var _a;
            if (backendFbObjects === void 0) { backendFbObjects = this.backendFbObjects; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.utilSvc.readConfig("/dist2/config/adf.json", platform || this.utilSvc.platformEnv)];
                    case 1:
                        configData = _b.sent();
                        this.utilSvc.config = configData;
                        this.webServerComponent.initWebServer(); // Start Express server
                        this.storeDbSvc.initFirebase();
                        if ((_a = this.utilSvc.config.application) === null || _a === void 0 ? void 0 : _a.release) {
                            this.version = this.utilSvc.config.application.release;
                        }
                        return [4 /*yield*/, this.storeDbSvc.getObject(firebase_service_1.OBJECTNAME.wnUsers)];
                    case 2:
                        temp = _b.sent();
                        temptemp = this.utilSvc.objectToArray(temp);
                        tt = temptemp[0];
                        tt.stripeAccountId = 'yoyuoyu';
                        return [4 /*yield*/, this.storeDbSvc.setObject(firebase_service_1.OBJECTNAME.wnUsers + '/totototototo', tt)];
                    case 3:
                        temp1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error('Error during backend initialization:', error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MainComponent.prototype.cleanUpUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, listAllUsers;
            var _this = this;
            return __generator(this, function (_a) {
                token = '';
                listAllUsers = function (nextPageToken) {
                    var wnUser;
                    // List batch of users, 1000 at a time.
                    _this.utilSvc.firebaseAdmin
                        .auth()
                        .listUsers(1000, nextPageToken)
                        .then(function (listUsersResult) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log('listUsersResult=', listUsersResult);
                            return [2 /*return*/];
                        });
                    }); })
                        .catch(function (error) {
                        console.log('Error listing users:', error);
                    });
                };
                return [2 /*return*/];
            });
        });
    };
    MainComponent.prototype.listAuthUsers = function (nextPageToken) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, listUsersResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = (0, auth_1.getAuth)();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, auth.listUsers(1000, nextPageToken)];
                    case 2:
                        listUsersResult = _a.sent();
                        listUsersResult.users.forEach(function (userRecord) {
                            console.log('User:', userRecord.toJSON());
                        });
                        if (!listUsersResult.pageToken) return [3 /*break*/, 4];
                        // If there are more users, recursively list them
                        return [4 /*yield*/, this.listAuthUsers(listUsersResult.pageToken)];
                    case 3:
                        // If there are more users, recursively list them
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error('Error listing Firebase Auth users:', error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return MainComponent;
}());
exports.MainComponent = MainComponent;
