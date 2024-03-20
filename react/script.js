function Task({ content, isFirst, isLast, moveUp, moveDown, remove }) {
    return (
      <li className="task">
        <input type="checkbox" />
        <input type="text" value={content} />
        <div>
          <button onClick={moveUp} className="reorder" disabled={isFirst}>
            ▲
          </button>
          <button onClick={moveDown} className="reorder" disabled={isLast}>
            ▼
          </button>
        </div>
        <button onClick={remove} className="remove">
          ×
        </button>
      </li>
    );
  }
  
  function App() {
    const [tasks, setTasks] = React.useState([]);
  
    function addTask(event) {
      event.preventDefault();
      setTasks([...tasks, event.target.elements.task.value]);
      event.target.reset();
    }
  
    return (
      <main>
        <h1>To-do list</h1>
        <form onSubmit={addTask}>
          <label htmlFor="taskInput">
            <p className="lead">What do you have to do?</p>
          </label>
          <input type="text" id="taskInput" name="task" placeholder="Enter a task" />
        </form>
        <ul className="tasks">
          {tasks.map((task, index) => (
            <Task
              content={task}
              isFirst={index === 0}
              isLast={index === tasks.length - 1}
              moveUp={function () {
                tasks.splice(index, 1);
                tasks.splice(index - 1, 0, task);
                setTasks([...tasks]);
              }}
              moveDown={function () {
                tasks.splice(index, 1);
                tasks.splice(index + 1, 0, task);
                setTasks([...tasks]);
              }}
              remove={function () {
                tasks.splice(index, 1);
                setTasks([...tasks]);
              }}
            />
          ))}
        </ul>
      </main>
    );
  }
  
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);