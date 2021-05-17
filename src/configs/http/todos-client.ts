import axios from "axios";

const todosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});
export default todosClient;
