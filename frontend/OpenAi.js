import { config, parse } from "dotenv";
import OpenAI from "openai";
import axios from "axios";
config();
function getTimeofday() {
  return "5:45";
}

const getOrderStatus = async (orderId) => {
  const response = await axios.get("http://localhost:8000/api/revenue");
  return response;
};
const getTotalRevenue = async () => {
  const response = await axios.get("http://localhost:8000/api/revenue");
  return response;
};

// Example usage

const OpenAI_KEY = process.env.OPENAI_KEY;
const openai = new OpenAI({ apiKey: `${OpenAI_KEY}` });
export async function callOpenAIwithTools() {
  const context = [
    {
      role: "system",
      content:
        "you are very helpful chatbot that gives infomation abour time of the day and order status ",
    },
    {
      role: "user",
      content: " give me the total revenue  ?  ",
    },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: context,
    tools: [
      {
        type: "function",
        function: {
          name: "getOrderStatus",
          description: "get the order status",
          parameters: {
            type: "object",
            properties: {
              orderID: {
                type: "integer",
                description: "the id of order .",
              },
            },
            required: ["orderid"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "getTimeofday",
          description: "return time of the day ? ",
        },
      },
      {
        type: "function",
        function: {
          name: "getTotalRevenue",
          description: "return total revenue ? ",
        },
      },
    ],
    tool_choice: "auto", //the engine will decide which tool to use
  });
  const willInvokeFuntion = response.choices[0].finish_reason === "tool_calls";
  const toolCall = response.choices[0].message.tool_calls[0];
  if (willInvokeFuntion) {
    const toolName = toolCall.function.name;
    if (toolName === "getTotalRevenue") {
      const rawArg = toolCall.function.arguments;
      const parsedArg = JSON.parse(rawArg);
      let toolResponse;
      const Response = getTotalRevenue()
        .then((data) => {
          toolResponse = data.data;
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

callOpenAIwithTools();
