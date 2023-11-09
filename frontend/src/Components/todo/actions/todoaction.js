import axios from "axios";

const API_BASE_URL = "http://localhost:7000/api";

const TodoService = {
	fetchTodos: () => axios.get(`${API_BASE_URL}/todos/`),
  fetchTodayTodos: () => axios.get(`${API_BASE_URL}/today/`),
  fetchUpcomingTodos: () => axios.get(`${API_BASE_URL}/upcoming/`),

  createTodo: (newTodo) => axios.post(`${API_BASE_URL}/todos/`, newTodo),

  editTodo: (todoId, updatedTodo) =>
    axios.put(`${API_BASE_URL}/todos/${todoId}/`, updatedTodo),

  deleteTodo: (todoId) => axios.delete(`${API_BASE_URL}/todos/${todoId}/`),

  addComment: (todoId, comment) =>
    axios.put(`${API_BASE_URL}/todos/${todoId}/`, { comments: comment }),
};

export default TodoService;
