import { parseJsonGarbage } from "@/helpers/common";
import { executeAction, getActionViaUseCase, getInputSchema } from "./agent";
import { singleMessageLLM } from "./llm";

// // const instruction = "Send an email to Adarsh with the subject 'Test bro' and the body 'Hello World!'. His email is thatsmeadarshgupta@gmail.com.";
// // const instruction = "Star GaiaNet-AI/gaianet-node repository in GitHub";
// const instruction = "Search for GaiaNet on YouTube and give me its links";
// // const instruction = "Create a document in Google Docs and write hello world there";
// const entityId = "default";
// // const app = "gmail";
// // const app = "github";
// const app = "youtube";
// // const app = "GOOGLEDOCS";


// const actionName = await getActionViaUseCase(app, instruction);
// const inputSchema = await getInputSchema(actionName);
// // console.log(actionName, inputSchema);

// const actionParamPrompt = `Give me the params which I need to give to the funtion to run it by understanding the user's message.
// USER'S MESSAGE: ${instruction}

// -----

// FUNTION NAME: ${actionName}
// FUNCTION DESCRIPTION: ${inputSchema.description}
// FUNCTION PARAMS: ${inputSchema.parameters}
// FUNCTION REQUIRED PARAMS: ${inputSchema.required}

// -----

// GIVE ME THE RESPONSE IN JSON FORMAT like:
// {
//     "understand": true,
//     "askUser": null,
//     "params": {
//         "<arg1>": "<value1>",
//         "<arg2>": "value2>"
//     }
// }

// If you think you need some more information from the user, then ask the user for that information. In your response, set the value of the key 'ask_user' to the message you want to ask the user and set 'understand' to false.
// `;

// const paramsResponse = await singleMessageLLM(1, actionParamPrompt);
// const response = parseJsonGarbage(paramsResponse);

// if (!response["understand"]) {
//     console.error(response.askUser);
// } else {
//     const actionResponse = await executeAction(entityId, actionName, response["params"]);

//     const assistantResponsePrompt = `User has already ran an action which gave an output in json. The output is:
//     ${JSON.stringify(actionResponse)}

//     USER'S MESSAGE(this has been done): ${instruction}

//     Now, write a simple, formal, precise, insightful and human like manner response (better in paragraph) to give in return for the user's message taking help from the output of the action (try to give useful data).

//     YOUR RESPONSE:
//     `
//     const assistantResponse = await singleMessageLLM(1, assistantResponsePrompt);
//     console.log(assistantResponse);
// }

export async function runAgent(instruction, app, entityId = "default") {
    const actionName = await getActionViaUseCase(app, instruction);
    const inputSchema = await getInputSchema(actionName);
    // console.log(actionName, inputSchema);

    const actionParamPrompt = `Give me the params which I need to give to the funtion to run it by understanding the user's message.
    USER'S MESSAGE: ${instruction}

    -----

    FUNTION NAME: ${actionName}
    FUNCTION DESCRIPTION: ${inputSchema.description}
    FUNCTION PARAMS: ${inputSchema.parameters}
    FUNCTION REQUIRED PARAMS: ${inputSchema.required}

    -----

    GIVE ME THE RESPONSE IN JSON FORMAT like:
    {
        "understand": true,
        "askUser": null,
        "params": {
            "<arg1>": "<value1>",
            "<arg2>": "value2>"
        }
    }

    If you think you need some more information from the user, then ask the user for that information. In your response, set the value of the key 'ask_user' to the message you want to ask the user and set 'understand' to false.
    `;

    const paramsResponse = await singleMessageLLM(1, actionParamPrompt);
    const response = parseJsonGarbage(paramsResponse);

    if (!response["understand"]) {
        console.error(response.askUser);
    } else {
        const actionResponse = await executeAction(entityId, actionName, response["params"]);

        const assistantResponsePrompt = `User has already ran an action which gave an output in json. The output is:
        ${JSON.stringify(actionResponse)}

        USER'S MESSAGE(this has been done): ${instruction}

        Now, write a simple, formal, precise, insightful and human like manner response (better in paragraph) to give in return for the user's message taking help from the output of the action (try to give useful data).

        YOUR RESPONSE:
        `
        const assistantResponse = await singleMessageLLM(1, assistantResponsePrompt);
        // console.log(assistantResponse);
        return assistantResponse;
    }
}


