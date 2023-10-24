import './App.css';
import { useState, useRef} from 'react';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [editingTask, setEditingTask] = useState(null); // Uchováváme úkol, který se právě upravuje

  const inputTask = useRef(null);

  const addTask = () => {
    setTodoList([...todoList, {task: currentTask, completed: false}]);
    inputTask.current.value = "";
    setCurrentTask("");
  };

  const deleteTask = (taskToDelete) => {
   setTodoList(todoList.filter((task)=> {
    return task.task !== taskToDelete
      })
    );
  };

  

  const completeTask = (taskToComplete) => {
    setTodoList(todoList.map((task) => {
      return task.task === taskToComplete 
        ? {task: taskToComplete, completed: true} 
        : {task: task.task, completed: task.completed ? true : false };
      })
    );
  };

  const editTask = (taskToEdit) => {
    setEditingTask(taskToEdit);
    setCurrentTask(taskToEdit.task);
  };

  const saveEditedTask = () => {
    setTodoList(
      todoList.map((task) => ({
        ...task,
        task: task === editingTask ? currentTask : task.task,
      }))
    );
    setEditingTask(null); // Ukončíme režim úprav
    setCurrentTask("");
  };

  return (
    <div className="App">
      <h1>Todo Application</h1>
      <div className="input area">
        <input 
        ref={inputTask}
        type='text' 
        placeholder='Task...' 
        onKeyDown={(event) => {if (event.keyCode === 13){addTask()}}}
        onChange={(event) => {setCurrentTask(event.target.value);
        }} 
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <hr />
      <ul>
        {todoList.map((val, key) => {
          return (
          <div id='tasks'>
            <li key={key}>{val.task}</li>
            <button 
              className="buttonComplete" 
              onClick={() => completeTask(val.task)}
              >
                Complete
              </button>
            <button
              className="buttonEdit"
              onClick={() => editTask(val)}
            > Edit
            </button>
            <button 
              className="buttonDelete" 
              onClick={() => deleteTask(val.task)}
              >
                Delete
              </button>
            {val.completed ? <span class='badgeCompleted'>Completed</span> : <span class='badgeNotCompleted'>Not Completed</span>}
          </div>
          )
            })}
      </ul>
      {editingTask && (
        <div>
          <input
            type="text"
            value={currentTask}
            onChange={(event) => setCurrentTask(event.target.value)}
          />
          <button onClick={saveEditedTask}>Save</button>
        </div>
      )}
    </div>
  );
}

export default App;
