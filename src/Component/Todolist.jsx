import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Todolist.css';

function Todolist() {
    const [todos, setTodos] = useState([{ task: "sample task", id: uuidv4(), isDone: false }]);
    const [newTodo, setNewTodo] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const addNewTask = () => {
        if (newTodo.trim() === "") {
            setAlertMessage("Please enter a task");
            return;
        }
        setTodos(prevArray => [
            ...prevArray,
            { task: newTodo.trim(), id: uuidv4(), isDone: false }
        ]);
        setNewTodo("");
        setAlertMessage("");  // Clear the alert message after successful addition
    };

    const updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleDoneAll = () => {
        const allDone = todos.every(todo => todo.isDone);
        setTodos(todos.map(todo => ({
            ...todo, isDone: !allDone
        })));
    };

    const deleteAll = () => {
        setTodos([]);
    };

    const toggleDone = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isDone: !todo.isDone
                };
            }
            return todo;
        }));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addNewTask();
        }
    };

    return (
        <div className={`todo-container ${todos.length > 1 ? 'multiple-tasks-container' : ''}`}>
            <h2>Todo List</h2>
            <div className="input-container">
                <input
                    placeholder='Enter the task'
                    value={newTodo}
                    onChange={updateTodoValue}
                    onKeyPress={handleKeyPress} // Add the onKeyPress event here
                    required className='task-input'
                />
                <br />
                <button
                    onClick={addNewTask}
                    className="add-task-button"
                >
                    Add Task
                </button>
            </div>
            {alertMessage && <div className="alert-message">{alertMessage}</div>}
            <br />
            <ul className='todo-list'>
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        <span className={todo.isDone ? 'done' : ''}>{todo.task}</span>
                        &nbsp; &nbsp;
                        <div className="button-group">
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => toggleDone(todo.id)}
                                className="done-button"
                            >
                                {todo.isDone ? 'Mark as Undone' : 'Mark as Done'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button
                onClick={toggleDoneAll}
                className="mark-all-done-button"
            >
                {todos.every(todo => todo.isDone) ? 'Mark All as Undone' : 'Mark All as Done'}
            </button>
            <button
                onClick={deleteAll}
                className="mark-all-done-button"
            >
                Delete All
            </button>
        </div>
    );
}

export default Todolist;
