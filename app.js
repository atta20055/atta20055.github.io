const form = document.querySelector('#task-form');
const nameInput = document.querySelector('#task-name');
const dateInput = document.querySelector('#due-date');
const filter = document.querySelector('#task-filter');
const list = document.querySelector('#task-list');
const emptyMessage = document.querySelector('#empty-message');

let tasks = [];
try {
  const saved = JSON.parse(localStorage.getItem('atta-study-tasks') || '[]');
  if (Array.isArray(saved)) tasks = saved;
} catch (error) {
  console.warn('Saved tasks could not be loaded.', error);
}

function saveTasks() {
  try {
    localStorage.setItem('atta-study-tasks', JSON.stringify(tasks));
  } catch (error) {
    console.warn('Tasks could not be saved in this browser.', error);
  }
}

function renderTasks() {
  list.replaceChildren();
  const visible = tasks.filter(task =>
    filter.value === 'all' ||
    (filter.value === 'completed' && task.completed) ||
    (filter.value === 'active' && !task.completed)
  );
  emptyMessage.hidden = visible.length > 0;
  if (!visible.length) emptyMessage.textContent = 'No assignments to show.';

  for (const task of visible) {
    const item = document.createElement('li');
    if (task.completed) item.classList.add('completed');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark ${task.name} completed`);
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });
    const details = document.createElement('span');
    details.className = 'task-text';
    const title = document.createElement('span');
    title.textContent = task.name;
    const date = document.createElement('small');
    date.textContent = `Due: ${task.date}`;
    details.append(title, date);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', `Delete ${task.name}`);
    remove.addEventListener('click', () => {
      tasks = tasks.filter(entry => entry.id !== task.id);
      saveTasks();
      renderTasks();
    });
    item.append(checkbox, details, remove);
    list.append(item);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const date = dateInput.value;
  if (!name || !date) return;
  tasks.push({ id: crypto.randomUUID(), name, date, completed: false });
  saveTasks();
  form.reset();
  renderTasks();
});
filter.addEventListener('change', renderTasks);
renderTasks();
