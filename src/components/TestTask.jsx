import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [taskType, setTaskType] = useState("all");
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      setTasks([]);
    }
  }, []);

  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTasks(tasks);
  };

  const addTask = (event) => {
    event.preventDefault();
    if (editTaskId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId
          ? { ...task, title, description, priority, dueDate }
          : task
      );
      saveTasks(updatedTasks);
      clearForm();
    } else {
      const newTask = {
        id: tasks.length + 1,
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      saveTasks(updatedTasks);
      clearForm();
      setShowAddTaskForm(false);
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("High");
    setDueDate("");
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setPriority(taskToEdit.priority);
    setDueDate(taskToEdit.dueDate);
    setEditTaskId(taskId);
    setShowAddTaskForm(true);
  };

  const updateTask = (event) => {
    event.preventDefault();
    const updatedTasks = tasks.map((task) =>
      task.id === editTaskId
        ? { ...task, title, description, priority, dueDate }
        : task
    );
    saveTasks(updatedTasks);
    clearForm();
    setShowAddTaskForm(false);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleTaskTypeChange = (type) => {
    setTaskType(type);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(filter.toLowerCase()) ||
      task.description.toLowerCase().includes(filter.toLowerCase())
  );

  let displayedTasks;
  switch (taskType) {
    case "upcoming":
      displayedTasks = filteredTasks.filter(
        (task) => task.dueDate > new Date().toISOString().split("T")[0]
      );
      break;
    case "overdue":
      displayedTasks = filteredTasks.filter(
        (task) => task.dueDate < new Date().toISOString().split("T")[0]
      );
      break;
    case "completed":
      displayedTasks = filteredTasks.filter((task) => task.completed);
      break;
    default:
      displayedTasks = filteredTasks;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="mb-3 d-flex align-items-center">
            <button
              className="btn btn-success mr-2"
              onClick={() => setShowAddTaskForm(!showAddTaskForm)}
            >
              {showAddTaskForm ? "List All Tasks" : "Add Task"}
            </button>
            <div className="btn-group mr-2" role="group">
              <button
                className={`btn btn-primary ${
                  taskType === "all" ? "active" : ""
                }`}
                onClick={() => handleTaskTypeChange("all")}
              >
                All
              </button>
              <button
                className={`btn btn-info ${
                  taskType === "upcoming" ? "active" : ""
                }`}
                onClick={() => handleTaskTypeChange("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`btn btn-warning ${
                  taskType === "overdue" ? "active" : ""
                }`}
                onClick={() => handleTaskTypeChange("overdue")}
              >
                Overdue
              </button>
              <button
                className={`btn btn-success ${
                  taskType === "completed" ? "active" : ""
                }`}
                onClick={() => handleTaskTypeChange("completed")}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search tasks..."
              value={filter}
              onChange={handleChange}
            />
          </div>
          {showAddTaskForm && (
            <div>
              <h3>{editTaskId ? "Edit Task" : "Add Task"}</h3>
              <form onSubmit={editTaskId ? updateTask : addTask}>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority:</label>
                  <select
                    id="priority"
                    className="form-control"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date:</label>
                  <input
                    type="date"
                    id="dueDate"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editTaskId ? "Update" : "Submit"}
                </button>
              </form>
            </div>
          )}
          {!showAddTaskForm && (
            <div>
              <h3>Task List</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedTasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.priority}</td>
                      <td>{task.dueDate}</td>
                      <td>
                        <button
                          onClick={() => editTask(task.id)}
                          className="btn btn-primary mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="btn btn-danger mr-2"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          Delete
                        </button>
                        <button
                          onClick={() => toggleCompletion(task.id)}
                          className={`btn ${
                            task.completed ? "btn-secondary" : "btn-success"
                          }`}
                        >
                          {task.completed ? "Completed" : "Not Completed"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
