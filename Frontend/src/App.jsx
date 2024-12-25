import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [tasks, setTodo] = useState(''); // State for input field
  const [data, setData] = useState([]);  // State to hold the tasks list

  // Fetch tasks from backend on initial render
  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then((response) => {
        setData(response.data);  // Set tasks data from backend
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to handle submitting new task
  const submittodo = (e) => {
    e.preventDefault();  // Prevent page reload on form submit

    if (tasks.trim() === '') {
      alert('Please enter a task!');
      return;
    }

    // Add new task by sending a POST request
    axios.post("http://localhost:5000/tasks", { task: tasks })
      .then((response) => {
        setData(prevData => [...prevData, response.data]);  // Add new task to the list
        setTodo('');  // Clear the input field
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='w-screen h-screen bg-violet-900'>
      <h1 className='text-3xl font-bold text-center pt-10'>Docker Todo</h1>
      <div className='w-full flex justify-center mt-16 gap-5'>
        {/* Form to add tasks */}
        <form onSubmit={submittodo} className='flex gap-2'>
          <input
            className='h-10 w-72 rounded-xl focus:ring-4 pl-4'
            value={tasks}
            onChange={(e) => setTodo(e.target.value)} // Update state as user types
            placeholder='Enter a task'
          />
          <button
            type="submit"
            className="bg-red-600 h-10 w-24 rounded-md font-bold hover:bg-yellow-200"
          >
            Add Todo
          </button>
        </form>
      </div>
      <div className='w-full flex justify-center flex-col align-middle items-center overflow-y-scroll h-44'>
        {/* Display list of tasks */}
        {data.map((task) => (
          <div
            className='w-32 rounded-xl text-center p-1 bg-red-300 hover:bg-gray-500 m-4 font-bold'
            key={task.id}
          >
            {task.task}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
