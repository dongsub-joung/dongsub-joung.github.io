function addTasking() {
  let taskInput = document.getElementById("taskInput");
  let taskList = document.getElementById("taskList");

  if (taskInput.value === "") {
    alert("Please enter a task!");
    return;
  }

  let listItem = document.createElement("li");
  listItem.textContent = taskInput.value;
  
  // Save DB
  addComment(taskInput.value);

  let removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.onclick = function () {
    listItem.remove();
    removeFromDb(listItem.textContent);
  };

  listItem.appendChild(removeButton);

  listItem.onclick = function () {
    this.classList.toggle("completed");
  };

  taskList.appendChild(listItem);
  taskInput.value = "";
}


async function addComment(commentText) {
  await fetch('http://13.237.248.97:7080/comment/add', {
    method: 'POST',
    body: JSON.stringify({ 'todo': commentText })
  })
    .then(/* Handle response */)
    .catch(/* Handle errors */);
}

async function removeFromDb(text){
  await fetch('http://13.237.248.97:7080/comment/remove/')
    .then(/* Handle response */)
    .catch(/* Handle errors */);
}

async function listUpTodos(){
  await fetch('http://13.237.248.97:7080/comment/all')
  .then((response) => {
    return response.json()
  })
  .then((lists) => {
      for(i=0; i<lists.length; i++){
        console.log(lists[i]);
          let body= lists[i].todotext;
                      let frist= body.indexOf('todo');
          let result_string= body.substr(frist+7);
              result_string= result_string.slice(0,-2);
              showTodos(result_string);
      }
  });
}

function showTodos(todo){
  let taskInput = document.getElementById("taskInput");
  let taskList = document.getElementById("taskList");


  let listItem = document.createElement("li");
  listItem.textContent = todo;
  

  taskList.appendChild(listItem);
  taskInput.value = "";
}

let response= listUpTodos();
// console.log(response);

