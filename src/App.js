import './App.css';
import { useState, useRef} from 'react';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  
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
            <button onClick={() => completeTask(val.task)}>Complete</button>
            <button onClick={() => deleteTask(val.task)}>Delete</button>
            {val.completed ? <span class='badgeCompleted'>Task Completed</span> : <span class='badgeNotCompleted'>Task Not Completed</span>}
          </div>
          )
            })}
      </ul>
    </div>
  );
}

export default App;
