const { CosmosClient } = require("@azure/cosmos");
const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
    context.log('Processing newsletter subscription request');

    try {
        // Get email from request body
        const email = req.body.email;
        if (!email) {
            context.res = {
                status: 400,
                body: { error: "Email is required" }
            };
            return;
        }

        // Initialize Cosmos DB client
        const cosmosEndpoint = process.env.COSMOS_DB_ENDPOINT;
        const cosmosKey = process.env.COSMOS_DB_KEY;
        const cosmosClient = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
        const database = cosmosClient.database("luxuryintaste");
        const container = database.container("subscribers");

        // Check if email already exists
        const { resources: existingSubscribers } = await container.items
            .query(`SELECT * FROM c WHERE c.email = "${email}"`)
            .fetchAll();

        if (existingSubscribers.length > 0) {
            context.res = {
                status: 400,
                body: { error: "Email already subscribed" }
            };
            return;
        }

        // Add new subscriber to Cosmos DB
        const subscriber = {
            id: email,
            email: email,
            subscriptionDate: new Date().toISOString(),
            status: "pending"
        };

        await container.items.create(subscriber);

        // Initialize Azure Communication Services Email client
        const connectionString = process.env.ACS_CONNECTION_STRING;
        const emailClient = new EmailClient(connectionString);

        // Send confirmation email
        const emailMessage = {
            senderAddress: process.env.EMAIL_SENDER_ADDRESS,
            content: {
                subject: "Confirm your newsletter subscription",
                plainText: `Thank you for subscribing to our newsletter! Please click the following link to confirm your subscription: ${process.env.CONFIRMATION_URL}?email=${email}`
            },
            recipients: {
                to: [{ address: email }]
            }
        };

        await emailClient.send(emailMessage);

        context.res = {
            status: 200,
            body: { message: "Subscription successful! Please check your email to confirm." }
        };

    } catch (error) {
        context.log.error('Error processing subscription:', error);
        context.res = {
            status: 500,
            body: { error: "An error occurred while processing your subscription" }
        };
    }
}; 