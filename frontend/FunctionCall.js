
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
export const getAllBudget = async () => {
  const response = await axios.get("http://localhost:8000/getAllBudget");
  return response;
};
export const AddBudget = async (body) => {
  const response = await axios.post("http://localhost:8000/addBudget", body);
  return response;
};
