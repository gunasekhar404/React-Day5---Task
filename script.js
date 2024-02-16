const form = document.querySelector('#task-form');
const mylist = document.querySelector('.mylist');
const clear = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#additem');
const filterInput = document.querySelector('#filterTask');
//create Element
function createMyElement(elem,Class="", id=""){
  let element = document.createElement(elem);
  element.setAttribute("class", Class);
  element.setAttribute("id", id);
  return element;
}
// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    
    //Load task from LS if exists
    document.addEventListener('DOMContentLoaded',loadTaskFromLS);
    //add task event
    form.addEventListener('submit',addTaskEvent);
    //remove task event
    mylist.addEventListener('click',removeTask);
    //filter Task
    filterInput.addEventListener('keyup', filterTasks);
    //clear Task
    clear.addEventListener('click',clearTask);
}
//Load task from LS
function loadTaskFromLS(){
    
    let taskstore;
    if(localStorage.getItem('tasks') === null){
        taskstore = [];
    }
    else{
        document.querySelector('#filterlist').classList.remove('hide');
        taskstore = JSON.parse(localStorage.getItem('tasks'));
        
    }
    taskstore.forEach(task=>{
        addTaskToWindow(task);
    })
}
//add Task
function addTaskEvent(e){
    
    if(taskInput.value === '') {
        alert('Add a task');
    }
    else{
        document.querySelector('#filterlist').classList.remove('hide');
        //onloadDOM();
    }
    addTaskToWindow(taskInput.value);
    //add task to storage
    saveTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
    
    e.preventDefault();
    
    
}
//add Task to document
function addTaskToWindow(task){
    const li = createMyElement('li','list-group-item mb-2');
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //remove link
    const link = createMyElement('a','delete_item  float-right');
    link.innerHTML = '<i class="fa fa-remove text-danger"></i>';
    //li.draggable = true;
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    mylist.appendChild(li);
}
//Save Task in LS
function saveTaskInLocalStorage(task){
    let taskstore;
    if(localStorage.getItem('tasks') === null){
        taskstore = [];
    }
    else{
        taskstore = JSON.parse(localStorage.getItem('tasks'));
    }
    taskstore.push(task);
    localStorage.setItem('tasks',JSON.stringify(taskstore));
}
//remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete_item')){
        if(confirm(`Are You Sure? This action will delete the task "${e.target.parentElement.parentElement.textContent}"`)) {
            console.log(e.target);
            e.target.parentElement.parentElement.remove();
        }
    }
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    if(!mylist.firstElementChild){
        document.querySelector('#filterlist').classList.add('hide');
    }
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
//filter Task
function filterTasks(e){
    const textValue = e.target.value.toLowerCase();
    document.querySelectorAll('.list-group-item').forEach(task =>{
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(textValue) != -1){
            task.style.display = 'block';
          } else {
            task.style.display = 'none';
          }
    })

}
//clear Task
function clearTask(){
    while(mylist.firstChild){
        mylist.firstChild.remove();
    }
    // Clear from LS
    localStorage.clear();
    document.querySelector('#filterlist').classList.add('hide');
}
