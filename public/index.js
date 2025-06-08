



document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');
  const taskInput = document.getElementById('task-input');

  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value;
    if (title) {
      try {
        const response = await axios.post('https://worldapp-miniapp.onrender.com/tasks', { title });
        loadTasks();
        taskInput.value = '';
      } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task. Please try again.');
      }
    }
  });

  const loadTasks = async () => {
    try {
      const response = await axios.get('https://worldapp-miniapp.onrender.com/tasks');
      taskList.innerHTML = '';
      response.data.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;
        taskList.appendChild(li);
      });
    } catch (error) {
      console.error('Error loading tasks:', error);
      alert('Failed to load tasks. Please try again.');
    }
  };

  loadTasks();
});