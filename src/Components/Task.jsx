import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/isToday";

const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}
const AddTask = ({ onCancel, onAddTask }) => {
  const [task, settask] = useState("");
  const [date, setDate] = useState(null);
  return (
    <div className="add-task-dialog">
      <input value={task} onChange={(event) => settask(event.target.value)} />
      <div className="add-task-container">
        <div className="btn-container">
          <button
            disabled={!task}
            className="add-btn"
            onClick={() => {
              onAddTask(task, date);
              onCancel();
              settask("");
            }}
          >
            Add Task
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
              settask("");
            }}
          >
            Cancel
          </button>
        </div>
        <div className="icon-container"></div>
        <DayPickerInput
          onDayChange={(day) => setDate(day)}
          placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
          formatDate={formatDate}
          format={FORMAT}
          dayPickerProps={{
            modifiers: {
              disabled: [{ before: new Date() }],
            },
          }}
        />
      </div>
    </div>
  );
};
const Task_Header_Mapping = {
  INBOX: "Inbox",
  TODAY: "Today",
  NEXT: "Next 7 days",
};
const TaskItems = ({ SelectedTab, tasks }) => {
  if (SelectedTab === "NEXT") {
    return (
      <div className="task-Item-container">
        {tasks
          .filter(
            (task) =>
              isAfter(task.date, new Date()) &&
              isBefore(task.date, addDays(new Date(), 7))
          )
          .map((task) => (
            <div className="task-Item">
              <p>{task.text}</p>
              <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
            </div>
          ))}
      </div>
    );
  }
  if (SelectedTab === "TODAY") {
    return (
      <div className="task-Item-container">
        {tasks
          .filter((task) => isToday(task.date))
          .map((task) => (
            <div className="task-Item">
              <p>{task.text}</p>
              <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
            </div>
          ))}
      </div>
    );
  }
  return (
    <div className="task-Item-container">
      {tasks.map((task) => (
        <div className="task-Item">
          <p>{task.text}</p>
          <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
        </div>
      ))}
    </div>
  );
};
const Task = ({ SelectedTab }) => {
  const [ShowAddTask, setShowAddTask] = useState(false);
  const [tasks, settasks] = useState([]);
  const addNewTask = (text, date) => {
    const newTaskItem = { text, date: date || new Date() };
    settasks((prevState) => [...prevState, newTaskItem]);
  };
  return (
    <div className="task">
      <h2>{Task_Header_Mapping[SelectedTab]}</h2>
      {SelectedTab === "INBOX" ? (
        <div
          className="add-task-btn"
          onClick={() => setShowAddTask((prevState) => !prevState)}
        >
          <span className="plus">+</span>
          <span className="add-task-text">Add Task</span>
        </div>
      ) : null}
      {ShowAddTask && (
        <AddTask
          onCancel={() => setShowAddTask(false)}
          onAddTask={addNewTask}
        />
      )}
      {tasks.length > 0 ? (
        <TaskItems tasks={tasks} SelectedTab={SelectedTab} />
      ) : (
        <p>No tasks yet</p>
      )}
    </div>
  );
};
export default Task;
