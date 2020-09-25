import Axios from "axios";
import { BASE_URL } from "../config.json";

export async function post(path, request) {
  const response = await Axios.post(`${BASE_URL}${path}`, request);
  return response;
}

export default { post };
