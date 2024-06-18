import { config, parse } from "dotenv";
import OpenAI from "openai";
import axios from "axios";
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
const GetTotalExpenses = async () => {
  const response = await axios.get("http://localhost:8000/GetTotalExpenses");
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
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "GetSavings",
          "description": "Returns the savings money."
        },
        "function": {
          "name": "getAllBudget",
          "description": "Returns the budget data for all months from the database  , current month when current_month filed is true ."
        },
        "function": {
          "name": "getTotalSpend",
          "description": "Returns the money that spent in bill each month."
        },
        "function": {
          "name": "GetTotalExpenses",
          "description": "Returns the money that spending everyday each month."
        }
      }
    ],
    tool_choice: "auto", //the engine will decide which tool to use
  });
  const willInvokeFuntion = response.choices[0].finish_reason === "tool_calls";
  const toolCall = response.choices[0].message.tool_calls[0];
  if (willInvokeFuntion) {
    const toolName = toolCall.function.name;
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
    else if (toolName === "GetTotalExpenses") {
      const rawArg = toolCall.function.arguments;
      const parsedArg = JSON.parse(rawArg);
      let toolResponse;
      const Response = GetTotalExpenses()
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
