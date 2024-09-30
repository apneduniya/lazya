import { OpenAI } from "openai";


const LLM = [
    {
        "model": "llama",
        "baseURL": "https://llama.us.gaianet.network/v1",
    },
    {
        "model": "yicoder",
        "baseURL": "https://yicoder.us.gaianet.network/v1",
    },
    {
        "model": "gemma",
        "baseURL": "https://gemma.us.gaianet.network/v1",
    },
    {
        "model": "phi",
        "baseURL": "https://phi.us.gaianet.network/v1",
    }
];


export async function chatLLM(messages) {

    const openai_client = new OpenAI({
        apiKey: "nothing",
        baseURL: 'https://llama.us.gaianet.network/v1',
    });

    // Creating a chat completion request to the OpenAI model
    const response = await openai_client.chat.completions.create({
        model: "llama",
        messages: messages,
    });

    const content = response.choices[0].message.content;
    const finishReason = response.choices[0].finish_reason;

    if (finishReason !== "stop") {
        return `Something went wrong! Contact the developer with your usecase.`;
    } else {
        return content;
    }
}


export async function singleMessageLLM(modelIndex = 0, prompt) {

    const { model, baseURL } = LLM[modelIndex];

    const openai_client = new OpenAI({
        apiKey: "nothing",
        baseURL: baseURL,
    });

    // Creating a chat completion request to the OpenAI model
    const response = await openai_client.chat.completions.create({
        model: model,
        messages: [
            { role: "system", content: "You are an expert software developer agent." },
            { role: "user", content: prompt }
        ],
    });

    const content = response.choices[0].message.content;
    const finishReason = response.choices[0].finish_reason;

    if (finishReason !== "stop") {
        return `Something went wrong! Contact the developer with your usecase.`;
    } else {
        return content;
    }
}



