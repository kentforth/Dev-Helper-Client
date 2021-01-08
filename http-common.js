import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:13050/",
  headers: {
    "Content-type": "application/json"
  }
});
