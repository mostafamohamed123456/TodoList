import { useRef, useState } from "react";

function TodoList() {
    const [todos, setTodos] = useState([{ id: 1, text: "Item 1" }]);
    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const nextIdRef = useRef(2);

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) {
            return;
        }

        if (editingId !== null) {
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === editingId ? { ...todo, text: trimmedValue } : todo
                )
            );
            setEditingId(null);
            setInputValue("");
            return;
        }

        const newTodo = {
            id: nextIdRef.current,
            text: trimmedValue,
        };

        nextIdRef.current += 1;
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setInputValue("");
    };

    const handleDelete = (idToDelete) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== idToDelete));

        if (editingId === idToDelete) {
            setEditingId(null);
            setInputValue("");
        }
    };

    const handleEdit = (todo) => {
        setInputValue(todo.text);
        setEditingId(todo.id);
    };

    return (
        <div className="todo-list-container">
            <div className="todo-list-header">
                <h1>Todo List</h1>
            </div>
            <div className="todo-list-body">
                <form className="todo-list-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Add a new todo"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                    />
                    <button id="add-button" type="submit">
                        {editingId !== null ? "Update" : "Add"}
                    </button>
                </form>
                <div className="todo-list-items">
                    {todos.map((todo) => (
                        <div className="todo-list-item" key={todo.id}>
                            <h2>{todo.text}</h2>
                            <div className="todo-list-item-buttons">
                                <button type="button" onClick={() => handleDelete(todo.id)}>
                                    Delete <i className="fas fa-trash"></i>
                                </button>
                                <button type="button" onClick={() => handleEdit(todo)}>
                                    Edit <i className="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TodoList;