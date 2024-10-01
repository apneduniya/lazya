import { parseJsonGarbage } from "@/helpers/common";
import { executeAction, getActionViaUseCase, getInputSchema } from "@/utils/agent";
import { singleMessageLLM } from "@/utils/llm";
import { OpenAIToolSet } from "composio-core";
import { NextResponse } from "next/server";


async function runAgent(instruction, app, entityId) {
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

        Now, write a simple, formal, precise, insightful and human like manner response (better in paragraph) to give in return for the user's message taking help from the output of the action (try to give useful data). You can use markdown and \n to format the response. Use underline for links.

        YOUR RESPONSE:
        `
        const assistantResponse = await singleMessageLLM(1, assistantResponsePrompt);
        // console.log(assistantResponse);
        return assistantResponse;
    }
}

async function userConnectionExists(entityId, app) {
    const toolset = new OpenAIToolSet({
        apiKey: process.env.NEXT_PUBLIC_COMPOSIO_API_KEY,
    });

    const entity = toolset.client.getEntity(entityId);
    const connection = await entity.getConnection(app);
    if (!connection) {
        return false;
    }

    return true;
}


export async function POST(request) {
    try {
        const body = await request.json();
        const { instruction, app, entityId } = body;

        const isConnected = await userConnectionExists(entityId, app);
        if (!isConnected) {
            return NextResponse.json({
                response: `You have not connected ${app} app. Please connect it first.`,
            }, { status: 200 });
        }

        const response = await runAgent(instruction, app, entityId);

        return NextResponse.json({
            response: response,
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            response: "Something went wrong. Please contact the developer (@thatsmeadarsh). He will surely help you 😊.",
        }, { status: 500 });
    }
}


