import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Todolist.css';

function Todolist() {
    const [todos, setTodos] = useState([{ task: "sample task", id: uuidv4(), isDone: false }]);
    const [newTodo, setNewTodo] = useState("");

    const addNewTask = () => {
        if (newTodo.trim() === "") {
          alert("please enter the input")
            return;
        }
        setTodos(prevArray => [
            ...prevArray,
            { task: newTodo.trim(), id: uuidv4(), isDone: false }
        ]);
        setNewTodo(""); 
    };

    const updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const isDoneAll = () => {
        setTodos(todos.map(todo => ({
            ...todo, isDone: true
        })));
    };

    const deleteAll = () => {
        setTodos([]);
    };

    const isDoneOne = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isDone: true
                };
            }
            return todo;
        }));
    };

    return (
        <div className='todo-container'>
            <h2>Todo List</h2>
            <div className="input-container">
                <input
                    placeholder='Enter the task'
                    value={newTodo}
                    onChange={updateTodoValue}
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
                                onClick={() => isDoneOne(todo.id)}
                                className="done-button"
                            >
                                Mark As Done
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button
                onClick={isDoneAll}
                className="mark-all-done-button"
            >
                Mark All As Done
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
