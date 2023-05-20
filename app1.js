let displayAction = document.querySelector('.addItems-action');
let sumbitBtn = document.querySelector('.addItems-submit');
let groceryList = document.querySelector('.grocery-list');
let clear = document.querySelector('.displayItems-clear');
let itemTitle = document.querySelector('.displayItems-action');
let inputValue_1 = document.querySelector('.addItems-input');
let remove = document.querySelectorAll('.remove');

document.addEventListener("DOMContentLoaded", displayStorage);

//document.addEventListener('DOMContentLoaded', displayStorage);
sumbitBtn.addEventListener("click", addItem);

clear.addEventListener("click", removeAll);

groceryList.addEventListener("click", removelist);

function addItem(event){
  event.preventDefault();
  //let inputValue = document.querySelector('.addItems-input').value;
    let inputValue = inputValue_1.value;
  if(inputValue ===""){
    /*
    displayAction.classList.add("alert");
    setTimeout(function() {
      displayAction.classList.remove("alert");
    },3000) */
    showDisplay(displayAction,`not added to list`,false);

  }else {
    showDisplay(displayAction,`${inputValue} added to list`,true);
    createItem(inputValue);
    updateStorage(inputValue);
  }
}
  function showDisplay(element,text,value){
    if (value === false) {
      element.classList.add("alert");
      element.textContent = text;

      setTimeout(function() {
        element.classList.remove("alert");
      },3000)
    }else {
      element.classList.add("alert");
      element.textContent = text;
        inputValue_1.value ="";
      setTimeout(function() {
        element.classList.remove("alert");
      },3000)
    }
  }

function createItem(inputValue) {
groceryList.insertAdjacentHTML("afterbegin",`<div class="individualItems">
                                                <span class = "items"> ${inputValue} </span>
                                                <button class="remove"> remove </button>
                                             </div>`);
}

function updateStorage(inputValue){
  let groceryList;
  groceryList = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : [];
  groceryList.push(inputValue);
  localStorage.setItem('groceryList', JSON.stringify(groceryList));
}

function displayStorage(){
  let exist = localStorage.getItem("groceryList");
  if(exist)
  {
    let localStorage1 = JSON.parse(localStorage.getItem("groceryList"));
    localStorage1.forEach((item) => {
      createItem(item);
    });

  }
}

function removeAll() {
  localStorage.removeItem("groceryList");
  let individualItems = document.querySelectorAll('.individualItems');
  individualItems.forEach((item) => {
    groceryList.removeChild(item);
  });

}

function removelist(){
  let link = event.target.previousElementSibling;
  //console.log(link);
  if(link.classList.contains("items")){
    let text = event.target.previousElementSibling.textContent;
    showDisplay(itemTitle,`${text} removed from list`,true);
    let groceryItem = event.target.parentElement;
    groceryList.removeChild(groceryItem);
    editStorage(text);
  }
}

function editStorage(item){
    let groceryItems = JSON.parse(localStorage.getItem('groceryList'));
    let index = groceryItems.indexOf(item);
  //  console.log(groceryItems.indexOf(item));
    //console.log(groceryItems);
    groceryItems.splice(index, 1);
    //console.log(groceryItems.splice(index, 1))
    //first delete existing list
    localStorage.removeItem('groceryList');
    //add new updated/edited list
    localStorage.setItem('groceryList', JSON.stringify(groceryItems));

}
