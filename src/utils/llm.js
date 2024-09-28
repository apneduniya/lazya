import { OpenAI } from "openai";
import { OpenAIToolSet } from "composio-core";


// Initializing the OpenAI client with the API key from environment variables
const OPENAI_API_KEY = "something"
const openai_client = new OpenAI({      
    apiKey: OPENAI_API_KEY,
    baseURL: 'https://llamatool.us.gaianet.network/v1',
});

// Initializing the Composio ToolSet with the API key from environment variables
const COMPOSIO_API_KEY = process.env.NEXT_PUBLIC_COMPOSIO_API_KEY;
const composio_toolset = new OpenAIToolSet({
    apiKey: COMPOSIO_API_KEY,
    // baseURL: 'https://llama.us.gaianet.network/v1',
});


// Get GitHub tools that are pre-configured
// Retrieve actions
const tools = await composio_toolset.getTools({
    // actions: ["gmail_send_email"]
    apps: ["gmail"],
});

const instruction = "Send an email to John Doe with the subject 'Hello' and the body 'Hello, John!'. His email is jhon@example.com";

// console.log(await composio_toolset.getTools({
//     apps: ["gmail"],
//     useCase: "Send an email",
// }))

// console.log(tools);


// Creating a chat completion request to the OpenAI model
const response = await openai_client.chat.completions.create({
    // model: "gpt-4o",
    model: "llama",
    messages: [{ role: "user", content: instruction }],
    tools: tools,
    tool_choice: "auto",
});

console.log(response.object)


// Extracting tool calls from the response and logging them
let resp = response.choices[0].message.tool_calls 
console.log(resp);

// Handling the tool call using Composio ToolSet
await composio_toolset.handleToolCall(response);

