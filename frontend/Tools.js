export const tools = [
  {
    type: "function",
    function: {
      name: "getTotalSpend",
      description:
        "Returns the total amount of money spent for a specified month, including a breakdown by each transaction.",
      parameters: {
        type: "object",
        properties: {
          month: {
            type: "string",
            description:
              "Specify the month to retrieve spending data for, formatted as 'YYYY-MM'. For example, '2024-01' for January 2024.",
          },
        },
      },
      returns: {
        type: "array",
        description:
          "An array of objects, each containing the date, amount, and description of each transaction within the specified month.",
        items: {
          type: "object",
          properties: {
            date: {
              type: "string",
              description:
                "The date when the expense occurred, formatted as 'YYYY-MM-DD'.",
            },
            amount: {
              type: "number",
              description: "The amount of money spent in this transaction.",
            },
            description: {
              type: "string",
              description: "A brief description of the transaction.",
            },
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getSaving",
      description:
        "Returns detailed entries of money saved for a specified year, including only the description, amount, and saving date for each entry.",
      parameters: {
        type: "object",
        properties: {
          year: {
            type: "string",
            description:
              "Specify the year to retrieve savings data for, formatted as 'YYYY'. For example, '2024' for the year 2024.",
          },
        },
      },
      returns: {
        type: "array",
        description:
          "An array of objects, each object containing only the description, amount, and the date of saving for each entry recorded within the specified year.",
        items: {
          type: "object",
          properties: {
            description: {
              type: "string",
              description: "A brief description of the saving entry.",
            },
            amount: {
              type: "number",
              description:
                "The amount of money saved in this entry, expressed in the local currency.",
            },
            savingDate: {
              type: "string",
              description:
                "The date when the saving was recorded, formatted as 'YYYY-MM-DD'.",
            },
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
        "Retrieve the stock price for a specific ticker symbol over the past month.formatted to two decimal places",
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
      name: "GetMyProfit",
      description:
        "Returns my profit, including purchase price, quantity, current price, and other relevant information needed to calculate the profit or loss from the investment.",
    },
  },

  {
    type: "function",
    function: {
      name: "AddSaving",
      description:
        "Adds a new saving money entry for a specified date. ",
      parameters: {
        type: "object",
        properties: {
          saving_date: {
            type: "string",
            description:
              "The specific date for the saving, formatted as 'YYYY-MM-dd'. For example, '2025-01-01' represents the 1st of January 2025.",
          },
          amount: {
            type: "number",
            description:
              "The amount of the payment in japanese yen. Should be a positive double.",
          },
          describe: {
            type: "string",
            description:
              "A description of the saving type",
          },
          period: {
            type: "string",
            description:
              "The specific month for the payment, formatted as 'YYYY-MM'. For example, '2025-01' represents the January 2025.",
          },
        },
        required: ["saving_date", "amount", "describe" , "period"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "AddBudget",
      description:
        "Adds a new budget money entry for a specified month. ",
      parameters: {
        type: "object",
        properties: {
          amount: {
            type: "number",
            description:
              "The amount of the payment in japanese yen. Should be a positive double.",
          },
         
          period: {
            type: "string",
            description:
              "The specific month for the payment, formatted as 'YYYY-MM'. For example, '2025-01' represents the January 2025.",
          },
        },
        required: [ "amount" , "period"],
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
          period: {
            type: "string",
            description:
              "The specific month for the payment, formatted as 'YYYY-MM'. For example, '2025-01' represents the January 2025.",
          },
        },
        required: ["payment_date", "amount", "describe" , "period"],
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
          period: {
            type: "string",
            description:
              "The specific month for the expense, formatted as 'YYYY-MM'. For example, '2025-01' represents the January 2025.",
          },
        },
        required: ["payment_date", "amount", "describe" ,"period"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "GetNews",
      description:
        "Returns economic news headlines for a specified country. The input should be the 2-letter ISO 3166-1 code of the country you want to get headlines for. Possible options: AE, AR, AT, AU, BE, BG, BR, CA, CH, CN, CO, CU, CZ, DE, EG, FR, GB, GR, HK, HU, ID, IE, IL, IN, IT, JP, KR, LT, LV, MA, MX, MY, NG, NL, NO, NZ, PH, PL, PT, RO, RS, RU, SA, SE, SG, SI, SK, TH, TR, TW, UA, US, VE, ZA. ,  just give user title and description and url of articles",
      parameters: {
        type: "object",
        properties: {
          country_code: {
            type: "string",
            description:
              "The 2-letter ISO 3166-1 code of the country for which you want to retrieve economic news headlines.",
          },
        },
        required: ["country_code"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "remaining_amount",
      description:
        "Function to calculate the remaining amount after deducting expenses, obligatory payments, and savings from the budget.",
      parameters: {
        type: "object",
        properties: {
          budget_id: {
            type: "integer",
            description:
              "ID of the budget for which to calculate the remaining amount",
          },
        },
        required: ["budget_id"],
      },
    },
  },
  
];

export const content =
"you are a very helpful chatbot , your name is totoro ,and  my name is Hoang. Just give user information that they need, always ensure the correct function is selected from the tools list, provide concise information, and for data that can be easy to understand, display it in a table format with lines separating rows and columns for easier understanding. Don't say anything else.";
