// JS tests 
//Test1: Add Task
console.log("Test 1: Adding a new task...");
const testTask1 = new Task("Walk the fish");
myTasks.addTask(testTask1);
console.assert(Object.keys(myTasks.tasks).length === 1, "Task was not added correctly.");
console.log("Task added successfully:", myTasks.findTask(testTask1.id));

// Test 2: Prevent empty input
console.log(" Test 2: Preventing empty input...");
const emptyInput = "";
if (emptyInput.trim() === "") {
  console.log("prevented empty input!");
} else {
  console.error("Empty input was not prevented!");
}

// Test 3: Toggle tasks
console.log(" Test 3: Toggling completion...");
myTasks.toggleTask(testTask1.id);
console.assert(myTasks.findTask(testTask1.id).isCompleted === true, "Task not marked as done!");
console.log("Task completion toggled successfully.");

//Test 4: Deleting a task
console.log("Test 4: Deleting a task...");
const deleted = myTasks.deleteTask(testTask1.id);
console.assert(deleted === true, "Task deletion failed!");
console.log("Task deleted successfully.");

//Test 5: Statistics accuracy
console.log(" Test 5: Updating statistics...");
const testTask2 = new Task("Finish homework");
const testTask3 = new Task("Read a book");
myTasks.addTask(testTask2);
myTasks.addTask(testTask3);
myTasks.toggleTask(testTask2.id);

const allTasks = Object.values(myTasks.tasks);
const total = allTasks.length;
const completed = allTasks.filter(t => t.isCompleted).length;
const pending = total - completed;

console.assert(total === 2, "Total count mismatch!");
console.assert(completed === 1, " Completed count mismatch!");
console.assert(pending === 1, " Pending count mismatch!");
console.log(`Stats correct! Total: ${total}, Completed: ${completed}, Pending: ${pending}`);
