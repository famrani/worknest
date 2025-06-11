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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
var stripe_1 = __importDefault(require("stripe"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var StripeService = /** @class */ (function () {
    function StripeService() {
        var secretKey = process.env.STRIPE_SECRET_KEY;
        this.stripe = new stripe_1.default(secretKey, {
            apiVersion: '2025-03-31.basil',
        });
    }
    // Customers
    StripeService.prototype.createCustomer = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, name_1, phone, metadata, accountId, params, customer, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _a = req.body, email = _a.email, name_1 = _a.name, phone = _a.phone, metadata = _a.metadata, accountId = _a.accountId;
                        params = {
                            email: email,
                            name: name_1,
                            phone: phone,
                            metadata: metadata,
                        };
                        if (!accountId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.stripe.customers.create(params, { stripeAccount: accountId })];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.stripe.customers.create(params)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        customer = _b;
                        res.json(customer);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        res.status(400).json({ error: error_1.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StripeService.prototype.retrieveCustomer = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, customerId, accountId, customer, _b, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _a = req.query, customerId = _a.customerId, accountId = _a.accountId;
                        if (!accountId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.stripe.customers.retrieve(customerId, { stripeAccount: accountId })];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.stripe.customers.retrieve(customerId)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        customer = _b;
                        res.json(customer);
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _c.sent();
                        res.status(400).json({ error: error_2.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StripeService.prototype.updateCustomer = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, customerId, updateFields, accountId, customer, _b, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _a = req.body, customerId = _a.customerId, updateFields = _a.updateFields, accountId = _a.accountId;
                        if (!accountId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.stripe.customers.update(customerId, updateFields, { stripeAccount: accountId })];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.stripe.customers.update(customerId, updateFields)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        customer = _b;
                        res.json(customer);
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _c.sent();
                        res.status(400).json({ error: error_3.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StripeService.prototype.deleteCustomer = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, customerId, accountId, deleted, _b, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _a = req.body, customerId = _a.customerId, accountId = _a.accountId;
                        if (!accountId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.stripe.customers.del(customerId, { stripeAccount: accountId })];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.stripe.customers.del(customerId)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        deleted = _b;
                        res.json(deleted);
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _c.sent();
                        res.status(400).json({ error: error_4.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Payment Intents
    StripeService.prototype.createPaymentIntent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, amount, currency, customerId, applicationFee, accountId, params, paymentIntent, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, amount = _a.amount, currency = _a.currency, customerId = _a.customerId, applicationFee = _a.applicationFee, accountId = _a.accountId;
                        params = {
                            amount: amount,
                            currency: currency,
                            customer: customerId,
                            payment_method_types: ['card'],
                        };
                        if (accountId && applicationFee) {
                            params.transfer_data = { destination: accountId };
                            params.application_fee_amount = applicationFee;
                        }
                        return [4 /*yield*/, this.stripe.paymentIntents.create(params)];
                    case 1:
                        paymentIntent = _b.sent();
                        res.json(paymentIntent);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        res.status(400).json({ error: error_5.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StripeService.prototype.confirmPaymentIntent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentIntentId, paymentIntent, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        paymentIntentId = req.body.paymentIntentId;
                        return [4 /*yield*/, this.stripe.paymentIntents.confirm(paymentIntentId)];
                    case 1:
                        paymentIntent = _a.sent();
                        res.json(paymentIntent);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        res.status(400).json({ error: error_6.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StripeService.prototype.cancelPaymentIntent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentIntentId, paymentIntent, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        paymentIntentId = req.body.paymentIntentId;
                        return [4 /*yield*/, this.stripe.paymentIntents.cancel(paymentIntentId)];
                    case 1:
                        paymentIntent = _a.sent();
                        res.json(paymentIntent);
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        res.status(400).json({ error: error_7.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Refunds
    StripeService.prototype.createRefund = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, paymentIntentId, amount, accountId, params, refund, _b, error_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _a = req.body, paymentIntentId = _a.paymentIntentId, amount = _a.amount, accountId = _a.accountId;
                        params = {
                            payment_intent: paymentIntentId,
                            amount: amount,
                        };
                        if (!accountId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.stripe.refunds.create(params, { stripeAccount: accountId })];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.stripe.refunds.create(params)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        refund = _b;
                        res.json(refund);
                        return [3 /*break*/, 6];
                    case 5:
                        error_8 = _c.sent();
                        res.status(400).json({ error: error_8.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Setup Intents
    StripeService.prototype.createSetupIntent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var customerId, setupIntent, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        customerId = req.body.customerId;
                        return [4 /*yield*/, this.stripe.setupIntents.create({
                                customer: customerId,
                                payment_method_types: ['card'],
                            })];
                    case 1:
                        setupIntent = _a.sent();
                        res.json(setupIntent);
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        res.status(400).json({ error: error_9.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StripeService.prototype.confirmSetupIntent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var setupIntentId, setupIntent, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        setupIntentId = req.body.setupIntentId;
                        return [4 /*yield*/, this.stripe.setupIntents.confirm(setupIntentId)];
                    case 1:
                        setupIntent = _a.sent();
                        res.json(setupIntent);
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _a.sent();
                        res.status(400).json({ error: error_10.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Webhook
    StripeService.prototype.handleWebhook = function (req, res, endpointSecret) {
        return __awaiter(this, void 0, void 0, function () {
            var sig, event_1;
            return __generator(this, function (_a) {
                try {
                    sig = req.headers['stripe-signature'];
                    event_1 = this.stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
                    console.log('Webhook event received:', event_1.type);
                    res.status(200).send({ received: true });
                }
                catch (err) {
                    console.error('Webhook Error:', err.message);
                    res.status(400).send("Webhook Error: ".concat(err.message));
                }
                return [2 /*return*/];
            });
        });
    };
    // --- Add to your StripeService class ---
    // Create a Connected Standard Account
    StripeService.prototype.createStandardAccount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, _b, country, account, error_11;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, _b = _a.country, country = _b === void 0 ? 'FR' : _b;
                        return [4 /*yield*/, this.stripe.accounts.create({
                                type: 'standard',
                                country: country,
                                email: email,
                                business_type: 'individual', // or 'company'
                            })];
                    case 1:
                        account = _c.sent();
                        res.json(account);
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _c.sent();
                        res.status(400).json({ error: error_11.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Generate an Account Link for Onboarding
    StripeService.prototype.createStandardAccountLink = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accountId, refreshUrl, returnUrl, accountLink, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, accountId = _a.accountId, refreshUrl = _a.refreshUrl, returnUrl = _a.returnUrl;
                        return [4 /*yield*/, this.stripe.accountLinks.create({
                                account: accountId,
                                refresh_url: refreshUrl,
                                return_url: returnUrl,
                                type: 'account_onboarding',
                            })];
                    case 1:
                        accountLink = _b.sent();
                        res.json(accountLink);
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _b.sent();
                        res.status(400).json({ error: error_12.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Retrieve a Connected Account
    StripeService.prototype.retrieveAccount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accountId, account, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        accountId = req.query.accountId;
                        return [4 /*yield*/, this.stripe.accounts.retrieve(accountId)];
                    case 1:
                        account = _a.sent();
                        res.json(account);
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _a.sent();
                        res.status(400).json({ error: error_13.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ✅ Create a Connected Express Account
    StripeService.prototype.createExpressAccount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, _b, country, account, error_14;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('calling createExpressAccount');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _a = req.body, email = _a.email, _b = _a.country, country = _b === void 0 ? 'FR' : _b;
                        console.log('email=', email, ', country=', country);
                        return [4 /*yield*/, this.stripe.accounts.create({
                                type: 'express', // ✅ EXPRESS account
                                country: country,
                                email: email,
                                capabilities: {
                                    card_payments: { requested: true },
                                    transfers: { requested: true },
                                },
                                business_type: 'individual', // or 'company' if you need
                            })];
                    case 2:
                        account = _c.sent();
                        res.json(account);
                        return [3 /*break*/, 4];
                    case 3:
                        error_14 = _c.sent();
                        res.status(400).json({ error: error_14.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Generate an Account Link for Express Onboarding
    StripeService.prototype.createExpressAccountLink = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accountId, refreshUrl, returnUrl, accountLink, error_15;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, accountId = _a.accountId, refreshUrl = _a.refreshUrl, returnUrl = _a.returnUrl;
                        return [4 /*yield*/, this.stripe.accountLinks.create({
                                account: accountId,
                                refresh_url: refreshUrl,
                                return_url: returnUrl,
                                type: 'account_onboarding',
                            })];
                    case 1:
                        accountLink = _b.sent();
                        res.json(accountLink);
                        return [3 /*break*/, 3];
                    case 2:
                        error_15 = _b.sent();
                        res.status(400).json({ error: error_15.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // OPTIONAL - Manual Transfer to Connected Account
    StripeService.prototype.createTransfer = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, amount, currency, destinationAccountId, transfer, error_16;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, amount = _a.amount, currency = _a.currency, destinationAccountId = _a.destinationAccountId;
                        return [4 /*yield*/, this.stripe.transfers.create({
                                amount: amount,
                                currency: currency,
                                destination: destinationAccountId,
                            })];
                    case 1:
                        transfer = _b.sent();
                        res.json(transfer);
                        return [3 /*break*/, 3];
                    case 2:
                        error_16 = _b.sent();
                        res.status(400).json({ error: error_16.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // OPTIONAL - List PaymentIntents
    StripeService.prototype.listPaymentIntents = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, limit, paymentIntents, error_17;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query.limit, limit = _a === void 0 ? 10 : _a;
                        return [4 /*yield*/, this.stripe.paymentIntents.list({
                                limit: Number(limit),
                            })];
                    case 1:
                        paymentIntents = _b.sent();
                        res.json(paymentIntents);
                        return [3 /*break*/, 3];
                    case 2:
                        error_17 = _b.sent();
                        res.status(400).json({ error: error_17.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // OPTIONAL - List Charges
    StripeService.prototype.listCharges = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, limit, charges, error_18;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query.limit, limit = _a === void 0 ? 10 : _a;
                        return [4 /*yield*/, this.stripe.charges.list({
                                limit: Number(limit),
                            })];
                    case 1:
                        charges = _b.sent();
                        res.json(charges);
                        return [3 /*break*/, 3];
                    case 2:
                        error_18 = _b.sent();
                        res.status(400).json({ error: error_18.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StripeService.prototype.setRoutes = function (stripeRouter) {
        var _this = this;
        // --- Customers ---
        stripeRouter.post('/stripe/customer', function (req, res) { return _this.createCustomer(req, res); });
        stripeRouter.get('/stripe/customer/:customerId', function (req, res) { return _this.retrieveCustomer(req, res); });
        stripeRouter.put('/stripe/customer/:customerId', function (req, res) { return _this.updateCustomer(req, res); });
        stripeRouter.delete('/stripe/customer/:customerId', function (req, res) { return _this.deleteCustomer(req, res); });
        // --- Payment Intents ---
        stripeRouter.post('/stripe/payment-intent', function (req, res) { return _this.createPaymentIntent(req, res); });
        stripeRouter.post('/stripe/payment-intent/:paymentIntentId/confirm', function (req, res) { return _this.confirmPaymentIntent(req, res); });
        stripeRouter.post('/stripe/payment-intent/:paymentIntentId/cancel', function (req, res) { return _this.cancelPaymentIntent(req, res); });
        // --- Setup Intents ---
        stripeRouter.post('/stripe/setup-intent', function (req, res) { return _this.createSetupIntent(req, res); });
        stripeRouter.post('/stripe/setup-intent/:setupIntentId/confirm', function (req, res) { return _this.confirmSetupIntent(req, res); });
        // --- Refunds ---
        stripeRouter.post('/stripe/refund', function (req, res) { return _this.createRefund(req, res); });
        // --- Webhooks ---
        stripeRouter.post('/stripe/webhook', function (req, res, endpointSecret) { return _this.handleWebhook(req, res, endpointSecret); });
        stripeRouter.post('/stripe/standardaccount', function (req, res) { return _this.createStandardAccount(req, res); }); // Create Stripe Standard Account
        stripeRouter.post('/stripe/expressaccount', function (req, res) { return _this.createExpressAccount(req, res); }); // Create Stripe Express Account
        stripeRouter.post('/stripe/standardaccount-link', function (req, res) { return _this.createStandardAccountLink(req, res); }); // Create Stripe Express Account
        stripeRouter.post('/stripe/expressaccount-link', function (req, res) { return _this.createExpressAccountLink(req, res); }); // Create Account Onboarding Link
        stripeRouter.get('/stripe/account', function (req, res) { return _this.retrieveAccount(req, res); }); // Get Account Details
        // Optional: Manual Transfers
        stripeRouter.post('/stripe/transfer', function (req, res) { return _this.createTransfer(req, res); });
        // Optional: Admin listing
        stripeRouter.get('/stripe/payment-intents', function (req, res) { return _this.listPaymentIntents(req, res); });
        stripeRouter.get('/stripe/charges', function (req, res) { return _this.listCharges(req, res); });
    };
    return StripeService;
}());
exports.StripeService = StripeService;
