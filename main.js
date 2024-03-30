//Create tasks, create categories

// Define list item structure.
let listItem = {
  title: "",
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

document.getElementById("card1").innerHTML("change of plans");
