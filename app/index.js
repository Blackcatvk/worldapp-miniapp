document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');
  const taskInput = document.getElementById('task-input');

  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value;
    if (title) {
      const response = await axios.post('http://localhost:3000/tasks', { title });
      loadTasks();
      taskInput.value = '';
    }
  });

  const loadTasks = async () => {
    const response = await axios.get('http://localhost:3000/tasks');
    taskList.innerHTML = '';
    response.data.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.title;
      taskList.appendChild(li);
    });
  };

  loadTasks();
});