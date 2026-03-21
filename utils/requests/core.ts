import axios from "axios";

const requests = axios.create({
  baseURL: "https://monster-siren.hypergryph.com/",
  timeout: 60_000,
});

requests.interceptors.request.use((config) => config);
requests.interceptors.response.use((response) => response);

export default requests;
