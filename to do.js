//Js logic code for To-do list
//TASK MANAGER object?
function TaskManager() {
  this.tasks = {};   //For storing all task objects using their ID
  this.currentId = 0; // assigning a unique ID to each task
}


//Assigning a unique ID to each task
TaskManager.prototype.assignId = function() {
  this.currentId += 1; //allows ID count to increase by 1 
  return this.currentId;
};

//adding a new task to the task manager 
TaskManager.prototype.addTask = function(task) {
  task.id = this.assignId();   
  this.tasks[task.id] = task;  //for storing task in the task object 
  console.log(`[TASK ADDED] "${task.title}" (ID: ${task.id})`);
};

//finding a task by its ID
TaskManager.prototype.findTask = function(id) {
  if (this.tasks[id] !== undefined) {
    return this.tasks[id];
  }
  console.warn(`[WARNING] Task with ID ${id} not found.`);
  return false; //if task dows not exist
};

// changes in task completion status
TaskManager.prototype.toggleTask = function(id) {
  const task = this.findTask(id); //confirms if task with that ID exists
  if (task) {
    task.isCompleted = !task.isCompleted;
    console.log(`[TASK UPDATED] "${task.title}" marked as ${task.isCompleted ? "done" : "pending"}.`);
  }
};

//Deleting a task
TaskManager.prototype.deleteTask = function(id) {
  if (this.tasks[id] !== undefined) {
    delete this.tasks[id]; //for removing task from object
    console.log(`[TASK DELETED] Task with ID ${id} removed.`);
    return true;
  }
  console.warn(`[WARNING] Task with ID ${id} not found.`);
  return false;
};

//OBject to show task details
function Task(title, isCompleted = false) {
  this.title = title;
  this.isCompleted = isCompleted;
  this.id = null;
}


// Method to get info about task
Task.prototype.getInfo = function() {
  return `${this.title} — Status: ${this.isCompleted ? "Done" : "Pending"}`;
};

//HTML elements to JS variables using IDs
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

//new TaskManager to store all of the tasks
const myTasks = new TaskManager();

// Adding a new task by clicking "add task" button
addTaskBtn.addEventListener("click", function() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task before adding!");
    return;
  }

  const newTask = new Task(taskText);
  myTasks.addTask(newTask);
  taskInput.value = "";
  renderTasks();
});



//Rendering tasks to appear on the screen
function renderTasks() {
  taskList.innerHTML = "";
  const allTasks = Object.values(myTasks.tasks);

  allTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.isCompleted) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.title}</span>
      <button class="complete-btn">${task.isCompleted ? "Undo" : "Done"}</button>
      <button class="delete-btn">X</button>
    `;

    li.querySelector(".complete-btn").addEventListener("click", function() {
      myTasks.toggleTask(task.id);
      renderTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", function() {
      myTasks.deleteTask(task.id);
      renderTasks();
    });

    taskList.appendChild(li);
  });

  updateStats();
}


//For updating total, completed, and pending task counts 
 function updateStats() {
  const allTasks = Object.values(myTasks.tasks);
  const total = allTasks.length;
  const completed = allTasks.filter(task => task.isCompleted).length;
  const pending = total - completed;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  pendingTasks.textContent = pending;
}
