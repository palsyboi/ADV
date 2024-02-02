import { useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setEditIndex(null); // Reset edit mode if removing the currently edited todo
  };

  const startEdit = (index) => {
    setEditIndex(index);
  };

  const finishEdit = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">My Todo List</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-500 text-black"
          />
          <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </div>

      <ul className="text-left max-w-md w-full">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex items-center justify-between bg-white p-3 rounded shadow mb-2 ${
              editIndex === index ? 'border-blue-500 border-2' : ''
            }`}
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
                className="cursor-pointer"
              />
              {editIndex === index ? (
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => finishEdit(index, e.target.value)}
                  className="border p-1 text-sm focus:outline-none focus:ring focus:border-blue-500"
                />
              ) : (
                <span className={`${todo.completed ? 'line-through' : ''} text-gray-800`}>
                  {todo.text}
                </span>
              )}
            </label>
            <div className="flex items-center space-x-2">
              {editIndex !== index && (
                <button onClick={() => startEdit(index)} className="text-blue-500">
                  Edit
                </button>
              )}
              <button onClick={() => removeTodo(index)} className="text-red-500">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
