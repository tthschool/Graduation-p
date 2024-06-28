import axios from "axios";
export const getSaving = async () => {
  const response = await axios.get("http://localhost:8000/getSaving");
  return response;
};
export const getTotalSpend = async () => {
  const response = await axios.get("http://localhost:8000/getTotalSpend");
  return response;
};
export const ObligatoryPayments = async () => {
  const response = await axios.get("http://localhost:8000/ObligatoryPayments");
  return response;
};

export const AddBudget = async (body) => {
  const response = await axios.post("http://localhost:8000/addBudget", body);
  return response;
};
export const AddObligatoryPayments = async (body) => {
  const response = await axios.post(
    "http://localhost:8000/AddObligatoryPayments",
    body
  );
  return response;
};
export const AddExpenses = async (body) => {
  console.log(body);
  const response = await axios.post("http://localhost:8000/addExpenses", body);
  return response;
};
export const AddSaving = async (body) => {
  const response = await axios.post("http://localhost:8000/AddSaving", body);
  return response;
};

export const GetStockPrice = async (ticker_symbol_string) => {
  const symbol = JSON.parse(ticker_symbol_string);
  const ticker_symbol = symbol.ticker_symbol;
  try {
    const response = await axios.get(
      `https://api.twelvedata.com/time_series?apikey=6a55905e11af436d9137152754d87844&interval=1day&symbol=${ticker_symbol}&format=JSON`
    );
    return response;
  } catch (error) {
    return "sorry ticker symbol was not found";
  }
};
export const GetNews = async (country) => {
  const countryname = JSON.parse(country);
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=${countryname.country_code}&category=business&apiKey=26ecb3d51db748089fd69d3167a45938`
  );
  return response;
};

export const GetMyProfit = async () => {
  const mystocks_aw = await axios.post("http://localhost:8000/GetStock");
  const mystocks = mystocks_aw.data;
  for (let stock of mystocks) {
    const response = await axios.get(
      `https://api.twelvedata.com/time_series?apikey=6a55905e11af436d9137152754d87844&interval=1day&symbol=${stock.TickerSymbol}&format=JSON`
    );
    const latestData = response.data.values[0].datetime;
    const latestDatadate = response.data.values[0].close;
    stock.latestdate = latestData;
    stock.latestprice = latestDatadate;
  }
  return { data: mystocks };
};
export const remaining_amount = async (body) => {
  const response = await axios.post(
    "http://localhost:8000/GetRemainMoney",
    body
  );
  return response;
};

