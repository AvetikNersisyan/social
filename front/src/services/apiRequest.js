import axios from "axios";
import { getToken } from "../utils";

const API_URL = "http://localhost:8080/";

export const apiRequest = ({ params, body, url, headers, method }) => {
  const token = getToken();

  if (!headers) {
    headers = {
      Authorization: "Bearer " + token,
    };
  }

  if (!body) {
    body = {};
  }

  if (!params) {
    params = {};
  }

  switch (method.toUpperCase()) {
    case "GET": {
      return axios.get(`${API_URL}${url}`, {
        headers,
      });
    }
    case "POST": {
      return axios.post(`${API_URL}${url}`, body, {
        headers,
      });
    }
  }
};
