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
        // console.log(lists.length);
        for(i=0; i<lists.length; i++){
            // console.log(lists[i].in_body);
            let body= lists[i].in_body;
                        let frist= body.indexOf('body');
            let result_string= body.substr(frist+7);
		result_string= result_string.slice(0,-2);
		showComment(result_string);

        }
    });
}

let response_comment= fetch('http://somebodyhelpmeplz.n-e.kr/comment/all');
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
        await fetch('http://somebodyhelpmeplz.n-e.kr/comment/add', {
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
