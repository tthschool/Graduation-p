import { config, parse } from "dotenv";
import OpenAI from "openai";
import { tools } from "./Tools.js";
import axios from "axios";
import { getSaving , getAllBudget , getTotalSpend ,ObligatoryPayments ,AddBudget } from "./FunctionCall.js";
config();
const tools_list  = [getSaving  , getAllBudget ,getTotalSpend ,ObligatoryPayments ,AddBudget]
const tools_listsub  = ["getSaving"  , "getAllBudget" ,"getTotalSpend" ,"ObligatoryPayments" ,"AddBudget"]
const OPENAI_KEY = process.env.OPENAI_KEY;
const openai = new OpenAI({ apiKey: `${OPENAI_KEY}` });
export async function callOpenAIwithTools(text) {
  const context = [
    {
      role: "system",
      content:
        "you are a very helpful chatbot ,my name is hoang ,  just give user infomation that they need  ,always ensure the correct function is selected from the tools list, provide concise information, and for data that can be easy to understand  ,  dont say anything else",
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
    let toolResponse = null;
    let indexoffuntion  = null;
    let Response = null;
    indexoffuntion = (tools_listsub.indexOf(toolName));
    Response = tools_list[indexoffuntion]()
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
          axios.post(
            "http://localhost:8001/api/response",
            secondResponse.choices[0].message.content
          );
        });
  } else {
    axios.post("http://localhost:8001/api/response", "sorry i cant answer");
  }
}
