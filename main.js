let tasks = [];

const taskInput = document.getElementById("newTaskField");
const taskList = document.getElementById("mainTaskList");
const taskAddBtn = document.getElementById("newTaskButton");
let editID = -1;

function deleteTask(id) {
  tasks.splice(id, 1);
  reloadTasks();
  saveTasks();
  if (tasks.length < 1) {
    taskListMessage(1);
  }
}

function taskListMessage(msg) {
  const paragraph = document.createElement("p");
  if (msg == 1) {
    paragraph.innerHTML =
      "Nice work!!! :O :o <br> You completed all your tasks!🥳";
  } else {
    paragraph.innerHTML =
      "You have no tasks yet 🦥 <br> Create a task using the field above.";
  }
  taskList.appendChild(paragraph);
}

function toggleTaskStatus(id) {
  if (tasks[id].statusDone) {
    tasks[id].statusDone = false;
  } else {
    tasks[id].statusDone = true;
  }
  reloadTasks();
  saveTasks();
}

function editTask(id) {
  editID = id;
  taskInput.value = tasks[id].title;
  saveTasks();
}
function updateTask(id) {
  tasks[id].title = taskInput.value;
  reloadTasks();
  saveTasks();
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
  task.title = taskInput.value.trim();
  if (task.title !== "") {
    //Clear taskInput field
    addTask(task);
  } else {
    alert("Please enter a task title :)");
    taskInput.value = "";
  }
}

function addTask(task) {
  if (editID < 0) {
    tasks.push(task);
  } else {
    tasks[editID].title = taskInput.value;
  }
  reloadTasks();
  saveTasks();
}

function parseLocalStorage() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks == null) {
    tasks = [];
  }
}

function loadTasks() {
  parseLocalStorage();
  if (tasks == null || tasks.length <= 0) {
    taskListMessage();
  } else {
    reloadTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function reloadTasks() {
  taskInput.value = "";
  clearAllTasks();
  tasks.forEach((task) => {
    displayTask(task);
  });
  editID = -1;
}

function clearAllTasks() {
  taskList.innerHTML = "";
}

function displayTask(task) {
  let htmlCard = document.createElement("div");
  htmlCard.classList.add("card");
  //Converted to be used as string, create a card with this specific structure, edit variable of title
  //Want the right card structure with the buttons and everything
  let taskState;
  let buttonDisbled;

  if (task.statusDone) {
    taskState = "checked";
    buttonDisbled = "disabled";
  } else {
    taskState = "";
    buttonDisbled = "";
  }

  htmlCard.innerHTML =
    '      <div class="row">' +
    '        <input type="checkbox"' +
    taskState +
    ' class="checkTask" />' +
    '      <div class = "check">' +
    "        </div>" +
    '        <h1 class="title ' +
    taskState +
    '">' +
    task.title +
    "</h1>" +
    '        <div class="row r">' +
    "          <button " +
    buttonDisbled +
    ' class="icon edit" ' +
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
  const checkTask = htmlCard.querySelector(".checkTask");
  checkTask.addEventListener("click", function () {
    const id = tasks.indexOf(task);
    toggleTaskStatus(id);
  });
}

loadTasks();

taskAddBtn.addEventListener("click", processInput);
// Thanks: https://stackoverflow.com/questions/14542062/eventlistener-enter-key
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    processInput();
  }
});

//Incase
window.addEventListener("beforeunload", function (e) {
  saveTasks();
  //Fix confirmation for this
  return null;
});
