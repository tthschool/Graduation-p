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
const ObligatoryPayments = async () => {
  const response = await axios.get("http://localhost:8000/ObligatoryPayments");
  return response;
};
const AddBudget = async (body) => {
  console.log(body);
  const response = await axios.post("http://localhost:8000/addBudget", body);

  return response;
};
const OPENAI_KEY = process.env.OPENAI_KEY;
const openai = new OpenAI({ apiKey: `${OPENAI_KEY}` });
const tools = [
  {
    type: "function",
    function: {
      name: "getTotalSpend",
      description: "Returns the total amount of money spent",
      parameters: {
        type: "object",
        properties: {
          month: {
            type: "string",
            description: "Specify the month to retrieve spending data for",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "GetSavings",
      description: "Returns the total amount of money saved",
      parameters: {
        type: "object",
        properties: {
          year: {
            type: "string",
            description: "Specify the year to retrieve savings data for",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getAllBudget",
      description:
        "Returns the budget data for all months from the database, current month when current_month field is true",
      parameters: {
        type: "object",
        properties: {
          period: {
            type: "string",
            description:
              "Specify the month  to retrieve data for the current month only",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "ObligatoryPayments",
      description:
        "Returns data on obligatory monthly payments such as rent and utilities for all months from the database.",
      parameters: {
        type: "object",
        properties: {
          period: {
            type: "string",
            description:
              "Specify the month to retrieve ObligatoryPayments data for",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "AddBudget",
      description:
        "Adds a new budget entry for a specified month. This function requires parameters for the period, amount, and end date of the budget. The period should be formatted as 'YYYY-MM' (e.g., '2025-01'), amount is the total budget for the month, and enddate is the last day of the specified month.",
      parameters: {
        type: "object",
        properties: {
          period: {
            type: "string",
            description:
              "The month and year for which the budget is being set, formatted as 'YYYY-MM'.",
          },
          amount: {
            type: "number",
            description:
              "The total budget amount to be added for the specified period.",
          },
          enddate: {
            type: "string",
            description:
              "The last day of the budget period, formatted as 'YYYY-MM-DD'.",
          },
        },
        required: ["period", "amount", "enddate"],
      },
    },
  },
];

export async function callOpenAIwithTools(text) {
  console.log(text);
  const context = [
    {
      role: "system",
      content:
        "you are a very helpful chatbot , just give user infomation that they need  ,always ensure the correct function is selected from the tools list, provide concise information, and for data that can be organized in tabular form, present it in a clear and user-friendly table  , dont say anything else",
    },
    {
      role: "user",
      content: text,
    },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: context,
    tools: tools,
    tool_choice: "auto", //the engine will decide which tool to use
  });
  const willInvokeFuntion = response.choices[0].finish_reason === "tool_calls";
  if (willInvokeFuntion) {
    console.log(JSON.stringify(response.choices[0].message.tool_calls[0]));
    const toolCall = response.choices[0].message.tool_calls[0];
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
    } else if (toolName === "GetSavings") {
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
    } else if (toolName === "getTotalSpend") {
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
    } else if (toolName === "ObligatoryPayments") {
      const rawArg = toolCall.function.arguments;
      const parsedArg = JSON.parse(rawArg);
      let toolResponse;
      const Response = ObligatoryPayments()
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
    } else if (toolName === "AddBudget") {
      const rawArg = toolCall.function.arguments;
      const parsedArg = JSON.parse(rawArg);
      let toolResponse;
      const Response = AddBudget(parsedArg)
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
  } else {
    console.log("no");
    console.log(JSON.stringify(response.choices[0].message.content));
  }
}
