import { config, parse } from "dotenv";
import OpenAI from "openai";
import axios from "axios";
import { tools } from "./Tools.js";
config();

const GetSavings = async () => {
  const response = await axios.get("http://localhost:8000/getSaving");
  return response;
};
const getTotalSpend = async () => {
  const response = await axios.get("http://localhost:8000/getTotalSpend");
  return response;
};
const getAllBudget = async () => {
  const response = await axios.get("http://localhost:8000/getAllBudget");
  return response;
};

const OPENAI_KEY = process.env.OPENAI_KEY;
const openai = new OpenAI({ apiKey: `${OPENAI_KEY}` });

export async function callOpenAIwithTools(text) {
  console.log(text);
  const context = [
    {
      role: "system",
      content:
      "you are a very helpful chatbot that helps me with budget management",
    },
    {
      role: "user",
      content: text,
    },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: context,
    tools : tools,
    tool_choice: 'auto', //the engine will decide which tool to use
  });
  console.log(JSON.stringify(response.choices[0].message));
  console.log(JSON.stringify(response.choices[0].message.tool_calls[0]));
  const willInvokeFuntion = response.choices[0].finish_reason === "tool_calls";
  const toolCall = response.choices[0].message.tool_calls[0];
  if (willInvokeFuntion) {
    const toolName = toolCall.function.name;
    console.log(toolName);
    console.log(toolName);
    if (toolName === "getAllBudget") {
      const rawArg = toolCall.function.arguments;
      const parsedArg = JSON.parse(rawArg);
      let toolResponse;
      const Response = getAllBudget()
        .then((data) => {
          toolResponse = JSON.stringify(data.data);
        })
        .then(() => {
          context.push(response.choices[0].message);
          context.push({
            role: "tool",
            content: toolResponse,
            tool_call_id: toolCall.id,
          });
        })
        .then(async () => {
          const secondResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: context,
          });
          console.log(secondResponse.choices[0].message.content);
        });
    }
    else if (toolName === "GetSavings") {
      const rawArg = toolCall.function.arguments;
      const parsedArg = JSON.parse(rawArg);
      let toolResponse;
      const Response = GetSavings()
        .then((data) => {
          toolResponse = JSON.stringify(data.data);
        })
        .then(() => {
          context.push(response.choices[0].message);
          context.push({
            role: "tool",
            content: toolResponse,
            tool_call_id: toolCall.id,
          });
        })
        .then(async () => {
          const secondResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: context,
          });
          console.log(secondResponse.choices[0].message.content);
        });
    }
    else if (toolName === "getTotalSpend") {
      const rawArg = toolCall.function.arguments;
      const parsedArg = JSON.parse(rawArg);
      let toolResponse;
      const Response = getTotalSpend()
        .then((data) => {
          toolResponse = JSON.stringify(data.data);
        })
        .then(() => {
          context.push(response.choices[0].message);
          context.push({
            role: "tool",
            content: toolResponse,
            tool_call_id: toolCall.id,
          });
        })
        .then(async () => {
          const secondResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: context,
          });
          console.log(secondResponse.choices[0].message.content);
        });
    }
    
  }
}
