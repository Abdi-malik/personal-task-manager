document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskCategory = document.getElementById('taskCategory');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();
    const taskDueDate = taskDate.value;
    const taskCat = taskCategory.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        text: taskText,
        dueDate: taskDueDate,
        category: taskCat,
        completed: false
    };

    addTaskToDOM(task);
    saveTask(task);

    taskInput.value = '';
    taskDate.value = '';
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    if (task.completed) {
        listItem.classList.add('completed');
    }
    
    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (Due: ${task.dueDate} | Category: ${task.category})`;

    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = () => editTask(task, listItem);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.className = 'complete';
    completeButton.onclick = () => toggleCompleteTask(task, listItem);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task, listItem);

    taskActions.appendChild(editButton);
    taskActions.appendChild(completeButton);
    taskActions.appendChild(deleteButton);

    listItem.appendChild(taskText);
    listItem.appendChild(taskActions);

    taskList.appendChild(listItem);
}

function editTask(task, listItem) {
    const newTaskText = prompt('Edit task', task.text);
    const newDueDate = prompt('Edit due date', task.dueDate);
    const newCategory = prompt('Edit category', task.category);

    if (newTaskText !== null) task.text = newTaskText;
    if (newDueDate !== null) task.dueDate = newDueDate;
    if (newCategory !== null) task.category = newCategory;

    listItem.querySelector('span').textContent = `${task.text} (Due: ${task.dueDate} | Category: ${task.category})`;
    updateTasks();
}

function toggleCompleteTask(task, listItem) {
    task.completed = !task.completed;
    listItem.classList.toggle('completed');
    updateTasks();
}

function deleteTask(task, listItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(listItem);
    removeTask(task);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToDOM);
}

function updateTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(listItem => {
        const text = listItem.querySelector('span').textContent.split(' (Due: ')[0];
        const dueDate = listItem.querySelector('span').textContent.split('Due: ')[1].split(' | Category: ')[0];
        const category = listItem.querySelector('span').textContent.split('Category: ')[1].slice(0, -1);
        const completed = listItem.classList.contains('completed');
        
        tasks.push({ text, dueDate, category, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(t => t.text !== task.text || t.dueDate !== task.dueDate || t.category !== task.category);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
