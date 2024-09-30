

export async function getAppImage(appName) {
    const options = { method: 'GET', headers: { 'X-API-Key': process.env.NEXT_PUBLIC_COMPOSIO_API_KEY } };

    try {
        const response = await fetch(`https://backend.composio.dev/api/v1/apps`, options);
        const data = await response.json();

        const app = data['items'].find(app => app.name === appName.toLowerCase());

        console.log(app.logo);
        return app.logo;

    } catch (err) {
        console.error(err);
    }
}


export async function connectAppViaEntityId(entityId, appName) {
    
}

