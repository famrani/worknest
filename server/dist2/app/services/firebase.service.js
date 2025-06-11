"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.StoreDbService = exports.OBJECTNAME = void 0;
var common_1 = require("@nestjs/common"); // if using NestJS
var rxjs_1 = require("rxjs");
var admin = __importStar(require("firebase-admin")); // ✅ Correct way
var fs = __importStar(require("fs"));
var utils_service_1 = require("./utils.service");
var OBJECTNAME;
(function (OBJECTNAME) {
    OBJECTNAME["wnLocations"] = "backendlocations";
    OBJECTNAME["wnLocationtypes"] = "backendlocationtypes";
    OBJECTNAME["wnUsers"] = "backendusers";
    OBJECTNAME["wnMessages"] = "backendmessages";
    OBJECTNAME["wnEquipments"] = "backendequipments";
    OBJECTNAME["wnBookings"] = "backendbookings";
    OBJECTNAME["wnFeedbacks"] = "backendfeedbacks";
})(OBJECTNAME || (exports.OBJECTNAME = OBJECTNAME = {}));
var StoreDbService = /** @class */ (function () {
    function StoreDbService(utilSvc) {
        this.utilSvc = utilSvc;
        this.firebaseBSS = {};
        this.firebaseData = {};
    }
    StoreDbService.prototype.initFirebase = function () {
        var currentDir = process.cwd();
        var serviceAccount = JSON.parse(fs.readFileSync(currentDir + '/dist2/config/worknest-ca1e4-firebase-adminsdk-fbsvc-b2c22eac3a.json', 'utf8'));
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: this.utilSvc.databaseURL,
            storageBucket: 'your-bucket.appspot.com',
        });
        this.db = admin.database();
        this.bucket = admin.storage().bucket();
    };
    StoreDbService.prototype.getObject = function (refPath) {
        return __awaiter(this, void 0, void 0, function () {
            var snapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.ref(refPath).once('value')];
                    case 1:
                        snapshot = _a.sent();
                        return [2 /*return*/, snapshot.val()];
                }
            });
        });
    };
    StoreDbService.prototype.setObject = function (refPath, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.ref(refPath).set(data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StoreDbService.prototype.removeObject = function (refPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.ref(refPath).remove()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StoreDbService.prototype.subscribe = function (refPath, storeKey) {
        var _this = this;
        if (!this.firebaseBSS[storeKey]) {
            this.firebaseBSS[storeKey] = new rxjs_1.BehaviorSubject(null);
        }
        this.db.ref(refPath).on('value', function (snapshot) {
            var value = snapshot.val();
            _this.firebaseBSS[storeKey].next(value);
        });
    };
    StoreDbService.prototype.unsubscribe = function (refPath) {
        this.db.ref(refPath).off();
    };
    StoreDbService.prototype.uploadFile = function (localFilePath, destinationPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bucket.upload(localFilePath, {
                            destination: destinationPath,
                            metadata: {
                                cacheControl: 'public,max-age=31536000',
                            },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StoreDbService.prototype.deleteFile = function (destinationPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bucket.file(destinationPath).delete()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StoreDbService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [utils_service_1.UtilsService])
    ], StoreDbService);
    return StoreDbService;
}());
exports.StoreDbService = StoreDbService;
