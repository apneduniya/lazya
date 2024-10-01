import { OpenAI } from "openai";
import { OpenAIToolSet } from "composio-core";


export async function getActionViaUseCase(app, useCase) {

    const options = { method: 'GET', headers: { 'X-API-Key': process.env.NEXT_PUBLIC_COMPOSIO_API_KEY } };

    try {
        const response = await fetch(`https://backend.composio.dev/api/v2/actions?useCase=${useCase}&apps=${app}`, options);
        const data = await response.json();
        // console.log(data);

        const predictedAction = data.items[0].name;
        return predictedAction.toLowerCase();

    } catch (err) {
        console.error(err);
    }
}


export async function getInputSchema(actionName) { 
    const options = { method: 'GET', headers: { 'X-API-Key': process.env.NEXT_PUBLIC_COMPOSIO_API_KEY } };

    try {
        const response = await fetch(`https://backend.composio.dev/api/v1/actions/${actionName}`, options);
        const data = await response.json();
        // console.log(data);

        const inputSchema = {};
        inputSchema["parameters"] = data[0].parameters.properties;
        inputSchema["required"] = data[0].parameters.required;
        inputSchema["description"] = data[0].displayName;

        return inputSchema;

    } catch (err) {
        console.error(err);
    }
}

export async function executeAction(entityId, actionName, params) {
    const toolset = new OpenAIToolSet({
        apiKey: process.env.NEXT_PUBLIC_COMPOSIO_API_KEY,
        entityId: entityId,
    });

    const action = await toolset.executeAction(
        actionName,
        params,
        entityId
    );

    return action;
}


// async function executeAction(actionName, entityId, prompt) {

//     // lowercase the actionName
//     actionName = actionName.toLowerCase();
//     console.log(actionName);

//     const openai_client = new OpenAI({
//         apiKey: "something",
//         baseURL: 'https://llamatool.us.gaianet.network/v1',
//     });

//     const composio_toolset = new OpenAIToolSet({
//         apiKey: process.env.NEXT_PUBLIC_COMPOSIO_API_KEY,
//         entityId: entityId,
//     });

//     const tools = await composio_toolset.getTools({
//         actions: [`${actionName}`]
//     });

//     // Creating a chat completion request to the OpenAI model
//     const response = await openai_client.chat.completions.create({
//         model: "llama",
//         messages: [{ role: "user", content: prompt }],
//         tools: tools,
//         tool_choice: "auto",
//     });

//     const refusal = response.choices[0].message.refusal;
//     const finishReason = response.choices[0].finish_reason;

//     if (refusal || finishReason !== "tool_calls") {
//         console.error(refusal);
//         return `Something went wrong! Contact the developer with your usecase.`;
//     } else {
//         return "Your action has been executed successfully!";
//     }
// }


// export async function runAgent(prompt, entityId, app) {
//     const actionName = await getActionViaUseCase(app, prompt);

//     const result = await executeAction(actionName, entityId, prompt);

//     return result;
// }


// const prompt = "Send an email to Adarsh with the subject 'Test bro' and the body 'Hello World!'. His email is thatsmeadarshgupta@gmail.com.";
// const prompt = "Star GaiaNet-AI/gaianet-node repository in GitHub";
// const entityId = "default";
// // const app = "gmail";
// const app = "github";


// runAgent(prompt, entityId, app).then((result) => {
//     console.log(result);
// });

