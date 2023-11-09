import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Paper, Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import TodoService from './actions/todoaction';

function UpcomingBox({ todo, editTodo, deleteTodo, onCommentSubmit }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState('');

  const boxStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const handleCommentClick = () => {
    setIsCommenting(true);
  };

  const handleCommentSubmit = () => {
    onCommentSubmit(todo.id, newComment);
    setIsCommenting(false);
    setNewComment('');
  };

  return (
    <div style={boxStyle}>
      <div>
        <strong>{todo.title}</strong>
        <p>{todo.description}</p>
      
        {todo.comments && (
            <div>
              <IconButton onClick={handleCommentClick}>
                <CommentIcon />
              </IconButton>
              <span>{Array.isArray(todo.comments) ? todo.comments.length : 1}</span>
            </div>
          )}
      </div>
      <div>
        <button onClick={() => editTodo(todo.id)}>Edit</button>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
      {isCommenting && (
        <div>
          <TextField
            type="text"
            label="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
          >
            Submit Comment
          </Button>
        </div>
      )}
    </div>
  );
}

function Today() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    due_date: '',
  });
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    fetchTodoItems();
  }, []);

  const fetchTodoItems = () => {
    TodoService.fetchTodayTodos()
      .then((response) => {
        setTodos(response.data);
      })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevNewTodo) => ({
      ...prevNewTodo,
      [name]: value,
    }));
  };

  const createTodo = () => {
    TodoService.createTodo(newTodo)
      .then(() => {
        fetchTodoItems();
        setNewTodo({
          title: '',
          description: '',
          due_date: '',
        });
        setPopupOpen(false);
      })
      .catch((error) => {
        console.error('Error creating todo:', error);
      });
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setNewTodo({
        ...todoToEdit,
      });
      setEditMode(true);
      setEditTodoId(id);
      setPopupOpen(true);
    }
  };

  const saveEditedTodo = () => {
    axios
      .put(`http://localhost:7000/api/todos/${editTodoId}/`, newTodo)
      .then(() => {
        setEditMode(false);
        setEditTodoId(null);
        fetchTodoItems();
        setNewTodo({
          title: '',
          description: '',
          due_date: '',
        });
        setPopupOpen(false);
      })
      .catch((error) => {
        console.error('Error saving edited todo:', error);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:7000/api/todos/${id}/`)
      .then(() => {
        fetchTodoItems();
        setPopupOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  const openPopup = () => {
    setPopupOpen(true);
    setEditMode(false);
    setEditTodoId(null);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const addComment = (todoId, comment) => {
    axios
      .put(`http://localhost:7000/api/todos/${todoId}/`, {
        comments: comment,
      })
      .then(() => {
        fetchTodoItems();
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };
  
  return (
    <div>
      <h1>Today</h1>
      <button onClick={openPopup}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <UpcomingBox
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            onCommentSubmit={addComment}
          />
        ))}
      </ul>
      <Modal open={isPopupOpen} onClose={handleClosePopup}>
        <Paper
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <TextField
            type="text"
            name="title"
            label="Title"
            value={newTodo.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="text"
            name="description"
            label="Description"
            value={newTodo.description}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="date"
            name="due_date"
            value={newTodo.due_date}
            onChange={handleInputChange}
            fullWidth
          />
          {editMode && (
            <TextField
              type="text"
              name="comments"
              label="Comment"
              value={newTodo.comments}
              onChange={handleInputChange}
              fullWidth
            />
          )}
          {editMode ? (
            <Button variant="contained" color="primary" onClick={saveEditedTodo}>
              Save Edit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={createTodo}>
              Create Todo
            </Button>
          )}
        </Paper>
      </Modal>
    </div>
  );
}

export default Today;
