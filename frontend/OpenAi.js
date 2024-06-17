import { config, parse } from 'dotenv';
import OpenAI from "openai";
config();
function getTimeofday(){
    return '5:45'
}
function getOrderStatus(oerderId){
    console.log(`getting the status of oorder ${oerderId}`);
    const orderIDasN = parseInt(oerderId);
    if (orderIDasN %2 ==0) {
        return "in_process"
    }
    else{
        return 'completed'
    }
}
const OpenAI_KEY = process.env.OPENAI_KEY;
console.log(OpenAI_KEY);
const openai = new OpenAI({apiKey : `${OpenAI_KEY}`});
async function callOpenAIwithTools(){
    const context = [
        {
            role : 'system',
            content : 'you are very helpful chatbot that gives infomation abour time of the day and order status '
        },
        {
            role : 'user',
            content : ' what is order status of order 1234  ?  '
        }
    ]
    const response = await openai.chat.completions.create({
        model :'gpt-4o',
        messages :context,
        tools : [
            {
                type : 'function',
                function :{
                    name : 'getOrderStatus',
                    description : 'get the order status',
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "orderID": {
                                "type": "integer",
                                "description": "the id of order .",
                            },
                        },
                        "required": ["orderid"],
                    },
                }
            },
            {
                type : 'function',
                function : {
                    name : 'getTimeofday',
                    description : 'return time of the day ? '
                }
            },
            

        ],
        tool_choice : 'auto' //the engine will decide which tool to use
    });
    const willInvokeFuntion =  response.choices[0].finish_reason === 'tool_calls' ;
    const toolCall = response.choices[0].message.tool_calls[0];
    
    console.log(toolCall)
    if (willInvokeFuntion) {
        const toolName = toolCall.function.name;
        if(toolName ===  'getOrderStatus'){
            const rawArg = toolCall.function.arguments;
            const parsedArg = JSON.parse(rawArg);
            const toolResponse = getOrderStatus(parsedArg.orderID);
            context.push(response.choices[0].message)
            context.push({
                role : 'tool',
                content : toolResponse,
                tool_call_id :toolCall.id
            })
        }
        if(toolName ===  'getTimeofday'){
            const toolResponse = getTimeofday();
            context.push(response.choices[0].message)
            context.push({
                role : 'tool',
                content : toolResponse,
                tool_call_id :toolCall.id
            })
        }
        

    }
    const secondResponse = await openai.chat.completions.create({
        model :'gpt-4o',
        messages :context,
    })
    console.log(secondResponse.choices[0].message.content);

}
callOpenAIwithTools()