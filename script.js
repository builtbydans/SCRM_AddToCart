import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Importing the DB **NOTE, DB has been turned on private, so write is not possible**
const appSettings = {
    databaseURL: "https://addtocart-87451-default-rtdb.europe-west1.firebasedatabase.app/"
}

// Initialising app and using Firebase libs to set up handshake.
const app = initializeApp(appSettings)
const database = getDatabase(app)
// "shoppingList" is the DB setup in Firebase
const shoppingListInDB = ref(database, "shoppingList")

// DOM variables
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

// EventListener on Button that pushes input to the DB and clears the input
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInput();
})

// Retrieves items from DB if vals exist, loops and appends to list.
onValue(shoppingListInDB, function(snapshot) {
  clearListEl();

  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      appendToListItems(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items in the shopping list";
  }
})

// Takes item from DB returned by onValue function and appends to list
const appendToListItems = (item) => {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  // Allows user to remove items by doubleclick. remove method by Firebase.
  newEl.addEventListener("dblclick", function() {
    let exactLocationOfStoryInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfStoryInDB);
  })
  shoppingListEl.append(newEl);
}

// Clears the shopping list which is called in the onValue function
const clearListEl = () => {
  shoppingListEl.innerHTML = "";
}

// Clears the input field which is called in addButton function
const clearInput = () => {
  inputFieldEl.value = "";
};
