export const tools = [
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
      name: "getSaving",
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
        "Returns the budget data for all months from the database, current month when current_month field is true , and you can based on that data to provide user sum of individual moths ,and the The official currency is the Japanese yen , just give user useful infomation  ,  dont have to show column valid " ,
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
        "Returns data on obligatory monthly payments such as rent and utilities for all months from the database , and you can based on that to calculate sum of individual data of user want to .",
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
        "Adds a new budget entry for a specified month. This function requires parameters for the period, amount, and end date of the budget. The period should be formatted as 'YYYY-MM' (e.g., '2025-01'), amount is the total budget for the month",
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
        },
        required: ["period", "amount"],
      },
    },
  },
];

export  const content = "you are a very helpful chatbot ,my name is hoang ,  just give user infomation that they need  ,always ensure the correct function is selected from the tools list, provide concise information, and for data that can be easy to understand  ,  dont say anything else"