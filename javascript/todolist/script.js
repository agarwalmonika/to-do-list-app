document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks safely
  loadTasks();

  // Add task
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (!taskText) return;

    createTask(taskText, false);
    saveTasks();

    taskInput.value = '';
  });

  // Create task
  function createTask(text, completed) {
    const li = document.createElement('li');

    // checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    // text
    const span = document.createElement('span');
    span.textContent = text;

    // completed style
    if (completed) {
      li.classList.add('completed');
    }

    // checkbox event
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed');
      saveTasks();
    });

    // delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';

    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  }

  // Save tasks
  function saveTasks() {
    const tasks = [];

    document.querySelectorAll('#task-list li').forEach(li => {
      const text = li.querySelector('span').textContent;
      const completed = li.querySelector('input').checked;

      tasks.push({ text, completed });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks (SAFE VERSION)
  function loadTasks() {
    let savedTasks = [];

    try {
      const data = localStorage.getItem('tasks');
      savedTasks = data ? JSON.parse(data) : [];
    } catch (error) {
      console.log("Invalid data, clearing storage");
      localStorage.clear();
    }

    savedTasks.forEach(task => {
      createTask(task.text, task.completed);
    });
  }

});