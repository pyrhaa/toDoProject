const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const url = 'http://localhost:3001/todos/';

//// Add new object TODO in database /////

//id unique per new todo
const addToDatabase = (content) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ id: Math.random(), content: content }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
};

//delete todo from database(json) with his unique random ID
const deleteFromDatabase = (id) => {
  fetch(url + id, { method: 'DELETE' }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
};

///// ADD or DELETE todos on HTML  /////

// add new todos
const generateTemplate = (todo) => {
  const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center text-light">
    <span>${todo.content}</span>
    <i id=${todo.id} class="far fa-trash-alt delete"></i>
  </li>
  `;
  list.innerHTML += html;
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addToDatabase(todo);
    addForm.reset();
  }
});

//delete todos
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
    console.log(e.target.id);
    deleteFromDatabase(e.target.id);
  }
});

//////    Display of DATABASE //////

//collect database, return a promise
// typeof db: Promise
const db = fetch(url, { method: 'GET' }).then((response) => {
  return response.json();
});

//log result of promise, get each objet of my res in database
//typeof res: Array[{},{}, ...]
//typeof todo: Object {id, content}
db.then((res) => {
  console.log(res);
  for (const todo of res) {
    console.log(todo);
    generateTemplate(todo);
  }
});
