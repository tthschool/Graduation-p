export let tools = [
    {
        "type": "function",
        "function": {
            "name": "getAllBudget",
            "description": "Returns the budget data for all months from the database  , current month when current_month filed is true",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "object",
                        "description": "",
                    },
                    // "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                },
                // "required": ["location"],
            },
        },
        "type": "function",
        "function": {
            "name": "getTotalSpend",
            "description": "Returns the money that i spent",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "object",
                        "description": "",
                    },
                    // "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                },
                // "required": ["location"],
            },
        },
        "type": "function",
        "function": {
            "name": "GetSavings",
            "description": "Returns my money savings",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "object",
                        "description": "",
                    },
                    // "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                },
                // "required": ["location"],
            },
        },
        
    }
  ]