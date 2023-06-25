import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    appendToListItems();
    clearInput();
})

onValue(shoppingListInDB, function(snapshot) {
  let itemsArray = Object.values(snapshot.val());

  for (let i = 0; i < itemsArray.length; i++) {
    appendToListItems(itemsArray[i])
  }
})

const appendToListItems = (itemValue) => {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}

const clearInput = () => {
  inputFieldEl.value = "";
};
