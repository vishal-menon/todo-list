//Creating the Panel Div
let newPanel = (element) => {

let panel = document.createElement("div");
panel.setAttribute("class","panel");
panel.setAttribute("id",`${element.uid}`);

let checkboxDiv = document.createElement("div");
checkboxDiv.setAttribute("class","checkbox-div");
panel.appendChild(checkboxDiv);

let checkbox = document.createElement("input");

if(element.isComplete === false)
checkbox.checked = false;
else
checkbox.checked = true;

checkbox.setAttribute("class", "task-checkbox");
checkbox.setAttribute("type", "checkbox");
checkbox.setAttribute("id",`${element.uid}`);
checkbox.onchange = checkboxFunc;
checkboxDiv.appendChild(checkbox);

let taskTextboxDiv = document.createElement("div");
taskTextboxDiv.setAttribute("class","task-textbox-div");
panel.appendChild(taskTextboxDiv);

let taskText = document.createElement("input");

if(element.isComplete === false)
taskText.setAttribute("class","task-text");
else
taskText.setAttribute("class","task-text-green");

taskText.setAttribute("type","text");
taskText.setAttribute("disabled",true);
taskText.setAttribute("id",`t${element.uid}`);
taskText.value = element.taskTextValue;
taskTextboxDiv.appendChild(taskText);

let buttonsDiv = document.createElement("div");
buttonsDiv.setAttribute("class","buttons-div");
panel.appendChild(buttonsDiv);

let editButton = document.createElement("button");
editButton.setAttribute("class","edit-button");
editButton.setAttribute("id",`${element.uid}`);
editButton.innerText = 'Edit';
editButton.onclick = editTodo;
buttonsDiv.appendChild(editButton);

let deleteButton = document.createElement("button");
deleteButton.setAttribute("class","delete-button");
deleteButton.innerText = 'Delete';
deleteButton.setAttribute("id",`${element.uid}`);
deleteButton.onclick = deleteTodo;
buttonsDiv.appendChild(deleteButton);

return panel;

}

//Model
let listParent = document.getElementById('white-list');
let panelItem = document.getElementById('panel-item');

let submitButton = document.getElementById('submit');
let inputText = document.getElementById('input-text');

let arrayTasks = [];

let storeData = () => {
  localStorage.setItem("myTasks", JSON.stringify(arrayTasks));
}

//Other functions

let pushToArray = (inputTextp, id) => {
  arrayTasks.push(
    {
    isComplete : false,
    taskTextValue : inputTextp.value,
    uid : id
    }
  );

  storeData();
}

let deleteFromArray = (uid) => {
  arrayTasks = arrayTasks.filter( element => {

    if(element.uid === +uid)
      return false;
    else
      return true;

  });
  storeData();
}

let editArray = (uid, changedText) => {
  
  arrayTasks.forEach(element => {

    if(element.uid === +uid)
    {
        element.taskTextValue = changedText;
    }

  });
  storeData();

}

let arrayCheckbox = (uid, isChecked) => {

  arrayTasks.forEach(element => {

    if(element.uid === +uid)
    {
        element.isComplete = isChecked;
    }

  });

  storeData();

}

/*
  {
    isComplete : bool,
    taskTextValue : string
  }
*/

//View

let render = () => {

  //Initially delete all content
  listParent.innerHTML = '';

  arrayTasks.forEach(element => {

    listParent.appendChild(newPanel(element));

  });

}

let editGraphics = (editTaskTextbox, button) => {

  editTaskTextbox.focus();
  button.innerText = "Save";

}


//Controller

submitButton.onclick = () => 
{
  //give the text and id to insert to the array

  const id = new Date().getTime();

  pushToArray(inputText, id);

  //give the array to display to render
  render();

  console.log(arrayTasks);
}

deleteTodo = (event) => {

  console.log(event);
  
  const uid = event.target.id;

  deleteFromArray(uid);

  render();

}

editTodo = (event) => {

  console.log(event);

  const uid = event.target.id;

  let button = event.target;

  let editTaskTextbox = document.getElementById(`t${uid}`);
  editTaskTextbox.removeAttribute("disabled");

  editGraphics(editTaskTextbox, button);

  event.target.onclick = saveTodo;
}

saveTodo = (event) => {

  const uid = event.target.id;

  let editTaskTextbox = document.getElementById(`t${uid}`);
  editTaskTextbox.setAttribute("disabled",true);

  editArray(uid, editTaskTextbox.value);

  event.target.onclick = editTodo;

  render();

}

checkboxFunc = (event) => {

  const uid = event.target.id;

  const isChecked = event.target.checked;
  console.log(isChecked);

  arrayCheckbox(uid, isChecked);

  render();
}

//Loading data from localStorage
if(localStorage.getItem("myTasks") !== null)
{
arrayTasks = JSON.parse(localStorage.getItem("myTasks"));
render();
}




