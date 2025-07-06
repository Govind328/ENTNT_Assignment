import mockData from "../data/mockData.json";

export const initializeLocalStorage = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(mockData.users));
    localStorage.setItem("patients", JSON.stringify(mockData.patients));
    localStorage.setItem("incidents", JSON.stringify(mockData.incidents));
  }
};
