# TaskManager

TaskManager is a simple task management application built with React. It allows users to add, edit, and delete tasks, as well as filter tasks based on task title.

## Technologies Used

- React
- Bootstrap
- FontAwesome

## Features

- Add new tasks with title, description, priority, and due date
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or not completed
- Filter tasks by status (upcoming, overdue, completed)
- Search tasks by title.

## Assumptions

- The application assumes that users have basic knowledge of task management concepts.
- The priority of tasks is categorized as High, Medium, or Low.
- Tasks can have due dates in the future, but they cannot have past due dates.
- Users can only edit or delete tasks that they have created.

## Add Task:

- When the user fills out the form and submits it, the addTask function is called.
- This function first prevents the default form submission behavior.
- It then performs validation to ensure that all required fields (title, description, and due date) are filled out.
- If validation passes, it checks if the task being added is a new task or an existing task being edited.
- If it's a new task, a new task object is created with the provided information (title, description, priority, due date, and completion status set to false).
- The new task is added to the tasks array using the spread operator and set using the setTasks function.
- The form fields are cleared using the clearForm function.
- An alert is displayed to notify the user that the task has been added successfully.

![Screenshot 1](/Images/Addtask.png)

## Update Task:

- When the user edits an existing task and submits the form, the updateTask function is called.
- This function first prevents the default form submission behavior.
- It then updates the task in the tasks array by mapping over all tasks and replacing the task with the matching editTaskId with the updated information.
- The updated tasks array is saved using the saveTasks function.
- The form fields are cleared using the clearForm function.
- The add task form is hidden by setting showAddTaskForm to false.
- An alert is displayed to notify the user that the task has been updated successfully.

## Delete Task:

- When the user clicks the delete button for a task, the deleteTask function is called with the corresponding task ID.
- A confirmation dialog is displayed to ensure the user wants to delete the task.
- If the user confirms the deletion, the task is removed from the tasks array using the filter method.
- The updated tasks array is saved using the saveTasks function.
- An alert is displayed to notify the user that the task has been deleted successfully.

## Upcoming Tasks:

- Tasks with due dates in the future are categorized as upcoming tasks. These tasks are displayed in the task list based on their due dates.

## Overdue Tasks:

- Tasks with due dates in the past are categorized as overdue tasks. These tasks are displayed in the task list based on their due dates.

## Completed Tasks:

- Tasks that have been marked as completed are categorized as completed tasks. These tasks are displayed separately in the task list or can be filtered to view only completed tasks.
