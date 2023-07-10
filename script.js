import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://addtocart-87451-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInput();
})

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

const appendToListItems = (item) => {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function() {
    let exactLocationOfStoryInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfStoryInDB);
  })
  shoppingListEl.append(newEl);
}

const clearListEl = () => {
  shoppingListEl.innerHTML = "";
}

const clearInput = () => {
  inputFieldEl.value = "";
};
