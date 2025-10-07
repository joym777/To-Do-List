//
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// saved tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// shows existing tasks after page loads (i think)
renderTasks();

// adding a task
addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim(); //

  if (taskText === "") {
    alert("Please enter a task before adding! :3");
    return;
  }

  //to create a new task object
  const newTask = {
    text: taskText,
    completed: false,
  };

  tasks.push(newTask); // Adds to task array
  saveTasks(); //Saves to localStorage
  renderTasks(); // Refreshes the list
  taskInput.value = ""; //clears the input
});


// rendering tasks on the list 
function renderTasks() {
  taskList.innerHTML = ""; // clears old list first

  if (tasks.length === 0) {
    emptyState.style.display = "block"; // for 'no tasks' message
  } else {
    emptyState.style.display = "none"; // removesempty message
  }

  // loop through tasks & create list items 
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    if (task.completed) {
      li.classList.add("completed"); //when task is complete
    }

    // HTML structure for tasks
    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="actions">
        <button class="complete-btn">${task.completed ? "Undo" : "Done"}</button>
        <button class="delete-btn">✖</button>
      </div>
    `;

    // complete task button
    li.querySelector(".complete-btn").addEventListener("click", function () {
      tasks[index].completed = !tasks[index].completed; // Toggle completion
      saveTasks();
      renderTasks();
    });

    //'delete task' button
    li.querySelector(".delete-btn").addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1); // Remove task
        saveTasks();
        renderTasks();
      }
    });

    taskList.appendChild(li); //to add task to list
  });

  updateStats(); // Update total/completed/pending items on list
}


// saves tasks to storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// task status update
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  pendingTasks.textContent = pending;
}

// "CLEAR ALL" button
const clearAllBtn = document.createElement("button");
clearAllBtn.textContent = "Clear All Tasks";
clearAllBtn.className = "clear-btn";

// Styling tip (optional): Add some spacing
//clearAllBtn.style.marginTop = "15px";
//clearAllBtn.style.padding = "8px 16px";
//clearAllBtn.style.borderRadius = "5px";
//clearAllBtn.style.border = "none";
//clearAllBtn.style.backgroundColor = "#ff6666";
//clearAllBtn.style.color = "#fff";
//clearAllBtn.style.cursor = "pointer";

// Add button below the task list
taskList.insertAdjacentElement("afterend", clearAllBtn);

// allows 'clear all' button to function
clearAllBtn.addEventListener("click", function () {
  if (tasks.length === 0) {
    alert("No tasks to clear! ✨");
    return;
  }

  if (confirm("Are you sure you want to clear ALL tasks?")) {
    tasks = []; // Reset array
    saveTasks(); // Update storage
    renderTasks(); // Refresh view
  }
});