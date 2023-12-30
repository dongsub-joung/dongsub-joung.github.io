function showComment(commentText) {
    const comment = document.createElement("div");
    comment.classList.add("comment");
    const paragraph = document.createElement("p");
    paragraph.textContent = commentText;
    comment.appendChild(paragraph);
    commentsList.appendChild(comment);
}

async function getListing(response){
    await response
    .then((response) => response.json())
    .then((lists) => {
        // console.log(lists);
        console.log(lists.length);
        for(i=0; i<lists.length; i++){
            console.log(lists[i].in_body);
            let body= lists[i].in_body;
                        let frist= body.indexOf('body');
            let result_string= body.substr(frist+7);
		result_string= result_string.slice(0,-2);
		showComment(result_string);

        }
    });
}

let response_comment= fetch('https://myapp-api.ngrok.dev/comment/all');
const commentsLists = getListing(response_comment);


for(i=0; i<commentsLists.lenght; i++){
    let body= commentsLists.in_body;
    let frist= body.indexOf('body');
    let last= body.lastIndexOf('WebKitFormBoundary');
    let result_string= body.substr(first+9, last-10);
    showComment(result_string);
}

document.addEventListener("DOMContentLoaded", function () {
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentsList = document.getElementById("commentsList");

    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (commentInput.value.trim() !== "") {
            showComment(commentInput.value);
            addComment(commentInput.value);
            commentInput.value = "";
        }
    });

    async function addComment(commentText) {
        await fetch('https://myapp-api.ngrok.dev/comment/add', {
            method: 'POST',
            body: JSON.stringify({ 'body': commentText  })
        })
            .then(/* Handle response */)
            .catch(/* Handle errors */);
    }
});

function addTasking() {
  let taskInput = document.getElementById("taskInput");
  let taskList = document.getElementById("taskList");

  if (taskInput.value === "") {
    alert("Please enter a task!");
    return;
  }

  let listItem = document.createElement("li");
  listItem.textContent = taskInput.value;
  addComment(taskInput.value);

  listItem.onclick = function () {
    this.classList.toggle("completed");
  };

  taskList.appendChild(listItem);
  taskInput.value = "";
}

async function addComment(commentText) {
  await fetch('https://todo.ngrok.app/todo/add', {
    method: 'POST',
    body: JSON.stringify({ 'todo': commentText })
  })
    .then(/* Handle response */)
    .catch(/* Handle errors */);
}

async function removeFromDb(_id) {
  try {
    const response = await fetch(`https://todo.ngrok.app/todo/remove/${_id}`);
    if (response.ok) {
      // Handle successful response
      console.log('Successfully removed from the database.');
      // You can perform additional actions here if needed
    } else {
      // Handle unsuccessful response (HTTP status code is not in the range of 200-299)
      throw new Error('Failed to remove from the database');
    }
  } catch (error) {
    // Handle fetch errors
    console.error('Error removing from the database:', error);
  }
}

async function listUpTodos(){
  await fetch('https://todo.ngrok.app/todos')
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
