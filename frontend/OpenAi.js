import { config, parse } from "dotenv";
import OpenAI from "openai";
import { tools, content } from "./Tools.js";
import axios from "axios";
import {
  getSaving,
  getAllBudget,
  getTotalSpend,
  ObligatoryPayments,
  AddBudget,
  AddObligatoryPayments,
  AddExpenses,
  GetStockPrice,
  AddSaving
} from "./FunctionCall.js";
config();
const tools_list = [
  getSaving,
  getAllBudget,
  getTotalSpend,
  ObligatoryPayments,
  AddBudget,
  AddObligatoryPayments,
  AddExpenses,
  GetStockPrice,
  AddSaving
];
const tools_listsub = [
  "getSaving",
  "getAllBudget",
  "getTotalSpend",
  "ObligatoryPayments",
  "AddBudget",
  "AddObligatoryPayments",
  "AddExpenses",
  "GetStockPrice",
  "AddSaving",
];
const OPENAI_KEY = process.env.OPENAI_KEY;
const openai = new OpenAI({ apiKey: `${OPENAI_KEY}` });
export async function callOpenAIwithTools(text) {
  const context = [
    {
      role: "system",
      content: content,
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
    const body = toolCall.function.arguments;
    let toolResponse = null;
    let indexoffuntion = null;
    let Response = null;
    indexoffuntion = tools_listsub.indexOf(toolName);
    Response = await tools_list[indexoffuntion](body);
    toolResponse = JSON.stringify(Response.data);
    context.push(response.choices[0].message);
    context.push({
      role: "tool",
      content: toolResponse,
      tool_call_id: toolCall.id,
    });
    const secondResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: context,
    });
    return secondResponse.choices[0].message.content;
  } else {
    axios.post(
      "http://localhost:8001/api/response",
      "sorry i can not  answer that question , can i do something else for you ??"
    );
  }
}
