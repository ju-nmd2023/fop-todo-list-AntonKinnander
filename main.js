//Create tasks, create categories

//can have an array for all the tasks in local storage
//Stringify array of json objects
//for loop, loop through all taks on page load (array)
//make sure tasks can be added, status changed and maybe even deleted before implementing local storage'
//local storage last

// Define list item structure.

let tasks = [];
const emptyTask = {
  title: "",
  //date value
  dueDate: 0,
  category: "unsorted",
  statusDone: false,
  isDivider: false,
};

//Create the list only in css - a flex container
// list items should use flex,
//Also a divider item, default is ungrouped but users can add their own

//Structure
// Main container
// Category divs and item container for that category

const taskInput = document.getElementById("newTaskField");
const taskList = document.getElementById("mainTaskList");
const dateInput = document.getElementById("addDate");
let editing = -1;

//Event handler button clicked
//check if localstorage is empty.
//tasklist.innerHTML = pmessage

//Change to for each in local storage for adding elements, check category
//delete removes in html, then localstorage?
//Always update from localstorage

//id tells the program if its a category or a task, default added in main task category

reloadTasks();

function deleteTask(id) {
  tasks.splice(id, 1);
  reloadTasks();
}

function editTask(id) {
  editing = id;
  taskInput.value = tasks[id].title;
}
function updateTask(id) {
  tasks[id].title = taskInput.value;
  removeListen(updateTask);
  reloadTasks();
  addListen(processInput);
}

function processInput() {
  let task = {
    title: "",
    //date value
    dueDate: 0,
    category: "unsorted",
    statusDone: false,
    isDivider: false,
  };

  if (taskInput.value !== "") {
    task.title = taskInput.value;
    //Clear taskInput field
    addTask(task, editing);
  }
}

function addTask(task, editing) {
  if (editing < 0) {
    tasks.push(task);
  } else {
    tasks[editing].title = taskInput.value;
  }
  reloadTasks();
}

function reloadTasks() {
  taskInput.value = "";
  clearAllTasks();
  tasks.forEach((task) => {
    displayTask(task);
  });
  editing = -1;
}

function clearAllTasks() {
  taskList.innerHTML = "";
}

function displayTask(task) {
  let htmlCard = document.createElement("div");
  htmlCard.classList.add("card");
  //Converted to be used as string, create a card with this specific structure, edit variable of title
  //Want the right card structure with the buttons and everything
  htmlCard.innerHTML =
    '      <div class="row">' +
    '        <input type="checkbox" name="" id="" />' +
    '        <h1 class="title active">' +
    task.title +
    "</h1>" +
    '        <div class="row r">' +
    '          <button class="icon date" ' +
    '            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>' +
    "          </button>" +
    // '          <p class="dueDate">' +
    //            getDate +
    // "          </p>" +
    '          <button class="icon edit" ' +
    '            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>' +
    "          </button>" +
    '          <button class="icon delete"' +
    '            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>' +
    "          </button>" +
    "        </div>" +
    "      </div>";

  taskList.appendChild(htmlCard);

  const deleteButton = htmlCard.querySelector(".delete");
  deleteButton.addEventListener("click", function () {
    const id = tasks.indexOf(task);
    if (
      confirm("Do you really want to delete this task? \n-" + tasks[id].title)
    ) {
      deleteTask(id);
    }
  });
  const editButton = htmlCard.querySelector(".edit");
  editButton.addEventListener("click", function () {
    const id = tasks.indexOf(task);
    editTask(id);
  });
}
const taskAddBtn = document.getElementById("newTaskButton");

taskAddBtn.addEventListener("click", processInput);
// Thanks: https://stackoverflow.com/questions/14542062/eventlistener-enter-key
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    processInput();
  }
});
