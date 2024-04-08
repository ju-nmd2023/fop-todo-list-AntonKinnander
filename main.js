//Create tasks, create categories

// Define list item structure.
let listItem = {
  title: "Change of value",
  //date value
  dueDate: 0,
  category: "unsorted",
  statusDone: false,
  color: "blue",
  visible: true,
};

let divider = {
  category: "",
  //Keep at top
  dueDate: -1,
  color: "blue",
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
function pushLocalstorage(title, duedate, category, id) {}

function addCard() {
  if (taskInput.value !== "") {
    let card = document.createElement("div");
    card.classList.add("card");
    //Converted to be used as string, create a card with this specific structure, edit variable of title
    //Want the right card structure with the buttons and everything
    card.innerHTML =
      '      <div class="row">' +
      '        <input type="checkbox" name="" id="" />' +
      '        <h1 class="title active">' +
      taskInput.value +
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
    taskList.appendChild(card);
    taskInput.value = "";
  }
}

taskAddBtn.addEventListener("click", addCard);
// Thanks: https://stackoverflow.com/questions/14542062/eventlistener-enter-key
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (!event.shiftKey) {
      event.preventDefault();
      addCard();
    }
  }
});
