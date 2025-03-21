import { OpenAIToolSet } from "composio-core";
import { NextResponse } from "next/server";


async function setupUserConnectionIfNotExists(entityId, app) {
    const toolset = new OpenAIToolSet({
        apiKey: process.env.COMPOSIO_API_KEY,
    });

    const entity = toolset.client.getEntity(entityId);
    let connection;

    try {
        connection = await entity.getConnection({ appName: app });
        if (!connection) {
            throw Error("No existing connection found.")
        } else {
            return false;
        }
    } catch (error) {
        // Connection doesn't exist, create a new one
        console.log("No existing connection found, creating a new one...");
        connection = await entity.initiateConnection({ appName: app });
        // console.log("Log in via: ", connection.redirectUrl);
        // return connection.waitUntilActive(60);

        return connection.redirectUrl; // returning redirectLink
    }
}

function extractSpecificSlugs(url) {
    // Split the URL by '/'
    const parts = url.split('/').filter(Boolean);

    // Find index of "api" and ensure "connect-app" follows it
    const apiIndex = parts.indexOf('api');

    if (apiIndex !== -1 && parts[apiIndex + 1] === 'connect-app') {
        // Extract the two desired slugs after 'api/connect-app'
        const slug1 = parts[apiIndex + 2]; // First slug
        const slug2 = parts[apiIndex + 3]; // Second slug

        return [slug1, slug2];
    }

    return [];
}

export async function GET(request) {

    const url = request.url;
    const slug = extractSpecificSlugs(url);

    const entityId = slug[0];
    const app = slug[1];

    const connection = await setupUserConnectionIfNotExists(entityId, app);

    if (connection) { // Not Exists
        return NextResponse.json({
            connected: false,  // Not connected
            redirectUrl: connection // Provide the connection link if not connected
        });
    }

    return NextResponse.json({ connected: true }); // Already connected | Thats why it came as false, as it exists
}



