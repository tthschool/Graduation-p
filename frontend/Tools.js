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
        "Returns the budget data for all months from the database, current month when current_month field is true , and you can based on that data to provide user sum of individual moths ,and the The official currency is the Japanese yen , just give user useful infomation  ,  dont have to show column valid ",
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
      name: "GetStockPrice",
      description:
        "Retrieve the stock price for a specific ticker symbol over the past month.",
      parameters: {
        type: "object",
        properties: {
          ticker_symbol: {
            type: "string",
            description:
              "The ticker symbol of the stock, such as AAPL for Apple.",
          },
        },
        required: ["ticker_symbol"],
      },
    },
  },

  {
    type: "function",
    function: {
      name: "AddObligatoryPayments",
      description:
        "Adds a new ObligatoryPayments entry for a specified date. This function records payments such as rent, insurance, and utility bills.",
      parameters: {
        type: "object",
        properties: {
          payment_date: {
            type: "string",
            description:
              "The specific date for the payment, formatted as 'YYYY-MM-dd'. For example, '2025-01-01' represents the 1st of January 2025.",
          },
          amount: {
            type: "number",
            description:
              "The amount of the payment in japanese yen. Should be a positive double.",
          },
          describe: {
            type: "string",
            description:
              "A description of the payment type, such as 'rent', 'insurance', 'electric bill', 'annuity bill', or 'gas bill'.",
          },
        },
        required: ["payment_date", "amount", "describe"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "AddExpenses",
      description:
        "Adds a new Expenses entry for a specified date. This function records daily spending on non-mandatory items such as groceries, entertainment, dining out, and other personal expenses. These are discretionary expenses that vary from day to day.",
      parameters: {
        type: "object",
        properties: {
          payment_date: {
            type: "string",
            description:
              "The specific date for the expense, formatted as 'YYYY-MM-dd'. For example, '2025-01-01' represents the 1st of January 2025.",
          },
          amount: {
            type: "number",
            description:
              "The amount of the expense in Japanese yen. Should be a positive double.",
          },
          describe: {
            type: "string",
            description:
              "A description of the expense type, such as 'groceries', 'dining out', 'entertainment', or 'personal care'.",
          },
        },
        required: ["payment_date", "amount", "describe"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "AddSaving",
      description:
        "This function adds a new saving record to the user's financial database. It takes a date, an amount, and a description to record details about the saving event.",
      parameters: {
        type: "object",
        properties: {
          period: {
            type: "string",
            description:
              "The specific date for the saving, formatted as 'YYYY-MM-dd'. For example, '2025-01-01' represents the 1st of January 2025.",
          },
          amount: {
            type: "number",
            description:
              "The amount of the saving in Japanese yen. Should be a positive number, represented as a double.",
          },
          describe: {
            type: "string",
            description:
              "A brief description of the saving event, providing context or additional details about the nature of the saving.",
          },
        },
        required: ["period", "amount", "describe"],
      },
    },
  },
];

export const content =
  "you are a very helpful chatbot ,my name is hoang ,  just give user infomation that they need  ,always ensure the correct function is selected from the tools list, provide concise information, and for data that can be easy to understand  ,  dont say anything else";
