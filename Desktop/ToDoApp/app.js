const input = document.getElementById('new-task');
const addBtn = document.getElementById('addTodo-btn');
const list = document.querySelector('.list');
const clearBtn =  document.getElementById('clear-btn');
const clearListBtn = document.getElementById('clear-btn-2');

const getSavedTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  return todos;
}

const saveTodo = (todo) => {
  const todos = getSavedTodos();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
 }


const displayTodo = (todo) => {
  const todoListItem = createTodoListItem(todo);
  const todoDeleteButton = createTodoDeleteButton(todo);
  todoListItem.appendChild(todoDeleteButton);
  list.appendChild(todoListItem);
}


const createTodoListItem = (todo) => {
  const li = document.createElement('li');
  li.className = 'list-item';
  li.textContent = todo.text;
  return li;
}

const deleteSavedTodo = (todo) => {
  const todos = getSavedTodos();
  const newTodos = todos.filter(savedTodos => savedTodos.id !== todo.id);
  localStorage.setItem('todos', JSON.stringify(newTodos) );
}

const createTodoDeleteButton = (todo) => {
  const todoDeleteButton = document.createElement('a');
  todoDeleteButton.className = 'delete-btn';
  todoDeleteButton.textContent = 'X'
  todoDeleteButton.style.backgroundColor = 'rgb(255, 204, 94)';
  todoDeleteButton.style.color = 'white';
  todoDeleteButton.style.cursor = 'pointer'; 
  
  todoDeleteButton.addEventListener('click', e => {
    e.target.parentElement.remove();
    deleteSavedTodo(todo);
  })
  return todoDeleteButton;
}

const addNewTodo = (e) => {
  e.preventDefault();
  if(input.value === ''){
    alert('Make sure to add a task!');
    return;
  }
  const todo = {
    id: Math.random(),
    text: input.value,
    isCompleted: false
  }

  displayTodo(todo);

  input.value = '';
}

addBtn.addEventListener('click', addNewTodo);
//clearBtn.addEventListener('click', clearTasks);

const displaySavedTodos = () => {
  const savedTodos = getSavedTodos();
  savedTodos.forEach(todo => displayTodo(todo));
} 
displaySavedTodos(); 

    /*const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.className = 'check-box';
    li.appendChild(checkBox);
    
    li.appendChild(x);
    
    clearBtn.style.display = 'block';
    setTaskToLocalStorage(input.value);
  
  
}*/

/*function removeTask(e){
  if(e.target.classList.contains('delete-btn')){
    e.target.parentElement.remove();
  }
}*/

/*function crossTask(e){
  if(e.target.classList.contains('check-box')){
    const li = e.target.parentElement;
    li.style.textDecoration = 'line-through';
  }
}

function clearTasks(){
  while(list.firstChild){
    list.removeChild(list.firstChild);
    clearBtn.style.display = 'none';
  }
}*/








