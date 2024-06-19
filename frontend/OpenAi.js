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
const ObligatoryPayments
= async () => {
  const response = await axios.get("http://localhost:8000/ObligatoryPayments");
  return response;
};
const OPENAI_KEY = process.env.OPENAI_KEY;
const openai = new OpenAI({ apiKey: `${OPENAI_KEY}` });
const tools = [
  {
      "type": "function",
      "function": {
          "name": "getTotalSpend",
          "description": "Returns the total amount of money spent",
          "parameters": {
              "type": "object",
              "properties": {
                  "month": {
                      "type": "string",
                      "description": "Specify the month to retrieve spending data for"
                  }
              },
             
          }
      }
  },
  {
      "type": "function",
      "function": {
          "name": "GetSavings",
          "description": "Returns the total amount of money saved",
          "parameters": {
              "type": "object",
              "properties": {
                  "year": {
                      "type": "string",
                      "description": "Specify the year to retrieve savings data for"
                  }
              },
             
          }
      }
  },
  {
      "type": "function",
      "function": {
          "name": "getAllBudget",
          "description": "Returns the budget data for all months from the database, current month when current_month field is true",
          "parameters": {
              "type": "object",
              "properties": {
                  "period": {
                      "type": "string",
                      "description": "Specify the month  to retrieve data for the current month only"
                  }
              },
             
          }
      }
  },
  {
    "type": "function",
    "function": {
        "name": "ObligatoryPayments",
        "description": "Returns data on obligatory monthly payments such as rent and utilities for all months from the database.",
        "parameters": {
            "type": "object",
            "properties": {
                "period": {
                  "type": "string",
                  "description": "Specify the month to retrieve ObligatoryPayments data for"
                }
            },
        }
    }
}
]

export async function callOpenAIwithTools(text) {
  console.log(text);
  const context = [
    {
      role: "system",
      content:
      "you are a very helpful chatbot , just give user infomation that they need  , pay attention in the tools list and make sure you chose correctly function  , dont say anything else",
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
    else if (toolName === "ObligatoryPayments") {
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
    }
    
  }
 
  
  else{
    console.log("no");
    console.log(JSON.stringify(response.choices[0].message.content));

  }
}
