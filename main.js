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
  visible: true,
};

//Create the list only in css - a flex container
// list items should use flex,
//Also a divider item, default is ungrouped but users can add their own

//Structure
// Main container
// Category divs and item container for that category

const taskAddBtn = document.getElementById("newTaskButton");
const taskInput = document.getElementById("newTaskField");
const taskList = document.getElementById("mainTaskList");

//Event handler button clicked
//check if localstorage is empty.
//tasklist.innerHTML = pmessage

//Change to for each in local storage for adding elements, check category
//delete removes in html, then localstorage?
//Always update from localstorage

//id tells the program if its a category or a task, default added in main task category

function newTask(task) {
  //Use default task object by default obviously for all new tasks can call the function empty but it will still pick up the call
  if (task == null) {
    task = emptyTask;
  }

  if (taskInput.value !== "") {
    task.title = taskInput.value;
    //Clear taskInput field
    taskInput.value = "";
    addTask(task);
  }
}
// function updateLocalstorage(card) {
//   for (let card of cards) {
//   }
// }
// function getLocalstorage() {}

function addTask(task) {
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
    '          <button class="icon date">' +
    '            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>' +
    "          </button>" +
    '          <button class="icon edit">' +
    '            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>' +
    "          </button>" +
    '          <button class="icon delete">' +
    '            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>' +
    "          </button>" +
    "        </div>" +
    "      </div>";
  // Clear input
  taskList.appendChild(htmlCard);
}

taskAddBtn.addEventListener("click", newTask);
// Thanks: https://stackoverflow.com/questions/14542062/eventlistener-enter-key
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    newTask();
  }
});
