import Stripe from 'stripe';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

export class StripeService {
    private stripe: Stripe;

    constructor() {
        let secretKey = process.env.STRIPE_SECRET_KEY;
        this.stripe = new Stripe(secretKey, {
            apiVersion: '2025-03-31.basil',
        });
    }

    // Customers

    async createCustomer(req: Request, res: Response) {
        try {
            const { email, name, phone, metadata, accountId } = req.body;

            const params: Stripe.CustomerCreateParams = {
                email,
                name,
                phone,
                metadata,
            };

            const customer = accountId
                ? await this.stripe.customers.create(params, { stripeAccount: accountId })
                : await this.stripe.customers.create(params);

            res.json(customer);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async retrieveCustomer(req: Request, res: Response) {
        try {
            const { customerId, accountId } = req.query;
            const customer = accountId
                ? await this.stripe.customers.retrieve(customerId as string, { stripeAccount: accountId as string })
                : await this.stripe.customers.retrieve(customerId as string);

            res.json(customer);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateCustomer(req: Request, res: Response) {
        try {
            const { customerId, updateFields, accountId } = req.body;

            const customer = accountId
                ? await this.stripe.customers.update(customerId, updateFields, { stripeAccount: accountId })
                : await this.stripe.customers.update(customerId, updateFields);

            res.json(customer);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteCustomer(req: Request, res: Response) {
        try {
            const { customerId, accountId } = req.body;

            const deleted = accountId
                ? await this.stripe.customers.del(customerId, { stripeAccount: accountId })
                : await this.stripe.customers.del(customerId);

            res.json(deleted);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Payment Intents

    async createPaymentIntent(req: Request, res: Response) {
        try {
            const { amount, currency, customerId, applicationFee, accountId } = req.body;

            const params: Stripe.PaymentIntentCreateParams = {
                amount,
                currency,
                customer: customerId,
                payment_method_types: ['card'],
            };

            if (accountId && applicationFee) {
                params.transfer_data = { destination: accountId };
                params.application_fee_amount = applicationFee;
            }

            const paymentIntent = await this.stripe.paymentIntents.create(params);
            res.json(paymentIntent);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async confirmPaymentIntent(req: Request, res: Response) {
        try {
            const { paymentIntentId } = req.body;

            const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);
            res.json(paymentIntent);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async cancelPaymentIntent(req: Request, res: Response) {
        try {
            const { paymentIntentId } = req.body;

            const paymentIntent = await this.stripe.paymentIntents.cancel(paymentIntentId);
            res.json(paymentIntent);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Refunds

    async createRefund(req: Request, res: Response) {
        try {
            const { paymentIntentId, amount, accountId } = req.body;

            const params: Stripe.RefundCreateParams = {
                payment_intent: paymentIntentId,
                amount,
            };

            const refund = accountId
                ? await this.stripe.refunds.create(params, { stripeAccount: accountId })
                : await this.stripe.refunds.create(params);

            res.json(refund);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Setup Intents

    async createSetupIntent(req: Request, res: Response) {
        try {
            const { customerId } = req.body;

            const setupIntent = await this.stripe.setupIntents.create({
                customer: customerId,
                payment_method_types: ['card'],
            });

            res.json(setupIntent);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async confirmSetupIntent(req: Request, res: Response) {
        try {
            const { setupIntentId } = req.body;

            const setupIntent = await this.stripe.setupIntents.confirm(setupIntentId);
            res.json(setupIntent);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Webhook

    async handleWebhook(req: Request, res: Response, endpointSecret: string) {
        try {
            const sig = req.headers['stripe-signature'];
            const event = this.stripe.webhooks.constructEvent(req.body, sig as string, endpointSecret);

            console.log('Webhook event received:', event.type);

            res.status(200).send({ received: true });
        } catch (err: any) {
            console.error('Webhook Error:', err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }

    // --- Add to your StripeService class ---

    // Create a Connected Standard Account
    async createStandardAccount(req: Request, res: Response) {
        try {
            const { email, country = 'FR' } = req.body;

            const account = await this.stripe.accounts.create({
                type: 'standard',
                country,
                email,
                business_type: 'individual', // or 'company'
            });

            res.json(account);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Generate an Account Link for Onboarding
    async createStandardAccountLink(req: Request, res: Response) {
        try {
            const { accountId, refreshUrl, returnUrl } = req.body;

            const accountLink = await this.stripe.accountLinks.create({
                account: accountId,
                refresh_url: refreshUrl,
                return_url: returnUrl,
                type: 'account_onboarding',
            });

            res.json(accountLink);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Retrieve a Connected Account
    async retrieveAccount(req: Request, res: Response) {
        try {
            const { accountId } = req.query;

            const account = await this.stripe.accounts.retrieve(accountId as string);

            res.json(account);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // ✅ Create a Connected Express Account
    async createExpressAccount(req: Request, res: Response) {
        console.log('calling createExpressAccount');
        try {
            const { email, country = 'FR' } = req.body;

            console.log('email=', email, ', country=', country);

            const account = await this.stripe.accounts.create({
                type: 'express', // ✅ EXPRESS account
                country,
                email,
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
                business_type: 'individual', // or 'company' if you need
            });

            res.json(account);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Generate an Account Link for Express Onboarding
    async createExpressAccountLink(req: Request, res: Response) {
        try {
            const { accountId, refreshUrl, returnUrl } = req.body;

            const accountLink = await this.stripe.accountLinks.create({
                account: accountId,
                refresh_url: refreshUrl,
                return_url: returnUrl,
                type: 'account_onboarding',
            });

            res.json(accountLink);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }


    // OPTIONAL - Manual Transfer to Connected Account
    async createTransfer(req: Request, res: Response) {
        try {
            const { amount, currency, destinationAccountId } = req.body;

            const transfer = await this.stripe.transfers.create({
                amount,
                currency,
                destination: destinationAccountId,
            });

            res.json(transfer);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // OPTIONAL - List PaymentIntents
    async listPaymentIntents(req: Request, res: Response) {
        try {
            const { limit = 10 } = req.query;

            const paymentIntents = await this.stripe.paymentIntents.list({
                limit: Number(limit),
            });

            res.json(paymentIntents);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // OPTIONAL - List Charges
    async listCharges(req: Request, res: Response) {
        try {
            const { limit = 10 } = req.query;

            const charges = await this.stripe.charges.list({
                limit: Number(limit),
            });

            res.json(charges);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }


    setRoutes(stripeRouter) {
        // --- Customers ---
        stripeRouter.post('/stripe/customer', (req: Request, res: Response) => this.createCustomer(req, res));
        stripeRouter.get('/stripe/customer/:customerId', (req: Request, res: Response) => this.retrieveCustomer(req, res));
        stripeRouter.put('/stripe/customer/:customerId', (req: Request, res: Response) => this.updateCustomer(req, res));
        stripeRouter.delete('/stripe/customer/:customerId', (req: Request, res: Response) => this.deleteCustomer(req, res));

        // --- Payment Intents ---
        stripeRouter.post('/stripe/payment-intent', (req: Request, res: Response) => this.createPaymentIntent(req, res));
        stripeRouter.post('/stripe/payment-intent/:paymentIntentId/confirm', (req: Request, res: Response) => this.confirmPaymentIntent(req, res));
        stripeRouter.post('/stripe/payment-intent/:paymentIntentId/cancel', (req: Request, res: Response) => this.cancelPaymentIntent(req, res));

        // --- Setup Intents ---
        stripeRouter.post('/stripe/setup-intent', (req: Request, res: Response) => this.createSetupIntent(req, res));
        stripeRouter.post('/stripe/setup-intent/:setupIntentId/confirm', (req: Request, res: Response) => this.confirmSetupIntent(req, res));

        // --- Refunds ---
        stripeRouter.post('/stripe/refund', (req: Request, res: Response) => this.createRefund(req, res));

        // --- Webhooks ---
        stripeRouter.post('/stripe/webhook', (req: Request, res: Response, endpointSecret: string) => this.handleWebhook(req, res, endpointSecret));

        stripeRouter.post('/stripe/standardaccount', (req, res) => this.createStandardAccount(req, res));               // Create Stripe Standard Account
        stripeRouter.post('/stripe/expressaccount', (req, res) => this.createExpressAccount(req, res));               // Create Stripe Express Account
        stripeRouter.post('/stripe/standardaccount-link', (req, res) => this.createStandardAccountLink(req, res));                    // Create Stripe Express Account
        stripeRouter.post('/stripe/expressaccount-link', (req, res) => this.createExpressAccountLink(req, res));        // Create Account Onboarding Link
        stripeRouter.get('/stripe/account', (req, res) => this.retrieveAccount(req, res));                // Get Account Details

        // Optional: Manual Transfers
        stripeRouter.post('/stripe/transfer', (req, res) => this.createTransfer(req, res));

        // Optional: Admin listing
        stripeRouter.get('/stripe/payment-intents', (req, res) => this.listPaymentIntents(req, res));
        stripeRouter.get('/stripe/charges', (req, res) => this.listCharges(req, res));
    }

}
