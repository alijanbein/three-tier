import { useState } from "react";

const UseHttp = () => {
  const BASE_URL = "http://localhost:3000/api/";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState("");
  const sendRequest = async (url, method = "GET", body = "", header = {}) => {
    let data;
    try {
      setIsError("");
      setIsLoading(true);
      const Response =
        (await fetch(BASE_URL + url, {
          method: method,
          headers: header,
          body: !!body ? JSON.stringify(body) : null,
        })) || null;
      setIsLoading(false);
      data = await Response.json();
    } catch (err) {
      setIsLoading(false);
    }

    return data;
  };
  return [isLoading, error, sendRequest];
};
export default UseHttp;
