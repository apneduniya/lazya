import { OpenAIToolSet } from "composio-core";
import { NextResponse } from "next/server";


async function userConnectionExists(entityId, app) {
    const toolset = new OpenAIToolSet({
        apiKey: process.env.NEXT_PUBLIC_COMPOSIO_API_KEY,
    });

    const entity = await toolset.client.getEntity(entityId);
    const connection = await entity.getConnection(app);
    if (!connection) {
        return false;
    }

    return true;
}

function extractSpecificSlugs(url) {
    // Split the URL by '/'
    const parts = url.split('/').filter(Boolean);

    // Find index of "api" and ensure "check-connect-app" follows it
    const apiIndex = parts.indexOf('api');

    if (apiIndex !== -1 && parts[apiIndex + 1] === 'check-connect-app') {
        // Extract the two desired slugs after 'api/check-connect-app'
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

    const connection = await userConnectionExists(entityId, app);

    if (!connection) {
        return NextResponse.json({
            connected: false,  // Not connected
        });
    }

    return NextResponse.json({ connected: true });
}



